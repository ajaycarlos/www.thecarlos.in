import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// ----- CONFIG FROM ENV (Vercel) -----
const PROJECT_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ""; 
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
const FROM_EMAIL = process.env.FROM_EMAIL || "ajaypulikkal940@gmail.com";
const BRANCH_SECRET = process.env.BRANCH_SECRET || "";

// Rate Limiting Config
const RATE_LIMIT_WINDOW_MINUTES = Number(process.env.RATE_LIMIT_WINDOW_MINUTES || "10");
const MAX_REGISTRATIONS_PER_IP = Number(process.env.MAX_REGISTRATIONS_PER_IP || "15");
const DUPLICATE_WINDOW_HOURS = Number(process.env.DUPLICATE_WINDOW_HOURS || "24");

// CORS Config
const ALLOWED_ORIGINS = [
  "https://www.thecarlos.in",
  "https://thecarlos.in",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
];

// Helper: Secure HMAC Verification
// FIX: Added ': any' to bypass type checking
const verifySignature = (secret: any, message: any, signature: any) => {
  if (!secret) return false;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(message);
  const digest = hmac.digest('hex');
  return digest.toLowerCase() === signature.toLowerCase();
};

// FIX: Added ': any' so you don't need the 'next' import
export default async function handler(req: any, res: any) {
  // --- 1. CORS Headers ---
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-client-info, x-branch-signature, x-branch-timestamp');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Init Supabase with <any> to silence schema errors
  if (!PROJECT_URL || !SERVICE_ROLE_KEY) {
    console.error("Missing Supabase Configuration");
    return res.status(500).json({ error: "Server Configuration Error" });
  }
  const supabase = createClient<any>(PROJECT_URL, SERVICE_ROLE_KEY);

  try {
    // --- 2. BRANCH VERIFICATION LOGIC (GET/Query) ---
    const { branch } = req.query;

    if (branch) {
      const sigHeader = req.headers['x-branch-signature'] || "";
      const tsHeader = req.headers['x-branch-timestamp'] || "";

      if (!sigHeader || !tsHeader) {
        return res.status(401).json({ error: "Missing signature headers" });
      }

      // Validate Timestamp
      const ts = Number(tsHeader);
      if (!ts || Math.abs(Date.now() - ts) > 2 * 60 * 1000) {
        return res.status(401).json({ error: "Request expired (invalid timestamp)" });
      }

      // Verify HMAC
      const message = `${branch}|${ts}|${branch}`; 
      const isValid = verifySignature(BRANCH_SECRET, message, sigHeader);

      if (!isValid) {
        return res.status(401).json({ error: "Invalid Signature" });
      }

      // Fetch Record
      const { data: record, error: fetchError } = await supabase
        .from("registrations")
        .select("*")
        .eq("token", branch)
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        console.error("DB Error:", fetchError);
        return res.status(500).json({ error: "Database error" });
      }
      if (!record) {
        return res.status(404).json({ error: "Token not found" });
      }

      return res.status(200).json({
        valid: true,
        branchId: record.branch_id,
        name: record.name,
        status: record.status
      });
    }

    // --- 3. REGISTRATION LOGIC (POST) ---
    if (req.method === 'POST') {
      const { email, name, branchId } = req.body;
      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

      // A. Input Validation
      if (!email || !name || !branchId) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      // B. Rate Limiting (IP based)
      const timeWindow = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();
      
      const { count, error: countError } = await supabase
        .from('rate_limits')
        .select('*', { count: 'exact', head: true })
        .eq('ip_address', clientIp)
        .gte('created_at', timeWindow);

      if (countError) {
         console.error("Rate Limit Check Error:", countError);
      }

      if (count && count >= MAX_REGISTRATIONS_PER_IP) {
        return res.status(429).json({ error: "Too many requests. Please try again later." });
      }

      // Log the request
      await supabase.from('rate_limits').insert({ ip_address: clientIp });

      // C. Duplicate Check
      const duplicateWindow = new Date(Date.now() - DUPLICATE_WINDOW_HOURS * 60 * 60 * 1000).toISOString();
      const { data: existing } = await supabase
        .from('registrations')
        .select('id')
        .eq('email', email)
        .eq('branch_id', branchId)
        .gte('created_at', duplicateWindow)
        .maybeSingle();

      if (existing) {
        return res.status(409).json({ error: "You have already registered recently." });
      }

      // D. Insert Registration
      const { data: newReg, error: insertError } = await supabase
        .from('registrations')
        .insert([{
          name,
          email,
          branch_id: branchId,
          ip_address: clientIp,
          status: 'pending'
        }])
        .select()
        .single();

      if (insertError) {
        console.error("Insert Error:", insertError);
        return res.status(500).json({ error: "Failed to save registration." });
      }

      // E. Send Email
      if (SENDGRID_API_KEY) {
        const emailContent = {
          personalizations: [{ to: [{ email: email }] }],
          from: { email: FROM_EMAIL },
          subject: `Registration Confirmed: ${name}`,
          content: [{
            type: "text/plain",
            value: `Hi ${name},\n\nThank you for registering for branch ${branchId}. We have received your request.\n\nBest,\nTeam Carlos`
          }]
        };

        const emailRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${SENDGRID_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(emailContent)
        });

        if (!emailRes.ok) {
          console.error("SendGrid Error:", await emailRes.text());
        }
      }

      return res.status(200).json({ 
        success: true, 
        message: "Registration successful", 
        id: newReg.id 
      });
    }

    return res.status(405).json({ error: "Method Not Allowed" });

  } catch (err) {
    console.error("Handler Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}