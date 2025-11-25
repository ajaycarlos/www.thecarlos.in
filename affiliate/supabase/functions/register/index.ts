// index.ts - Supabase Edge Function (Deno)
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ----- CONFIG FROM ENV -----
const PROJECT_URL = Deno.env.get("PROJECT_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SERVICE_ROLE_KEY")!;
const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY")!;
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "ajaypulikkal@zohomail.in";
const APP_BASE_URL = Deno.env.get("APP_BASE_URL") || "https://thecarlos.in";

// Secrets & Limits
const BRANCH_SECRET = Deno.env.get("BRANCH_SECRET") || "";
const RATE_LIMIT_WINDOW_MINUTES = Number(Deno.env.get("RATE_LIMIT_WINDOW_MINUTES") || "10");
const MAX_REGISTRATIONS_PER_IP = Number(Deno.env.get("MAX_REGISTRATIONS_PER_IP") || "15");
const DUPLICATE_WINDOW_HOURS = Number(Deno.env.get("DUPLICATE_WINDOW_HOURS") || "24");

// Init Supabase
const supabase = createClient(PROJECT_URL, SERVICE_ROLE_KEY);

// ----- CORS CONFIGURATION -----
const ALLOWED_ORIGINS = [
  "https://www.thecarlos.in",
  "https://thecarlos.in",
  "http://localhost:5500",
  "http://127.0.0.1:5500"
];

// ----- UTILITIES -----

// Generate HMAC Hex signature
async function hmacHex(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  const arr = Array.from(new Uint8Array(sig));
  return arr.map(b => b.toString(16).padStart(2, "0")).join("");
}

function nowIso() {
  return new Date().toISOString();
}

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr;
  return "unknown";
}

function makeToken() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

// ----- MAIN SERVER HANDLER -----
serve(async (req: Request) => {
  // 1. Calculate CORS Headers dynamically based on Origin
  const origin = req.headers.get("origin") || "";
  let allowOrigin = "https://www.thecarlos.in"; // Default fallback
  
  if (ALLOWED_ORIGINS.includes(origin)) {
    allowOrigin = origin;
  }

  const corsHeaders = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Branch-Id, X-Branch-Signature, X-Branch-Timestamp",
    "Access-Control-Max-Age": "86400"
  };

  // 2. Helper to send JSON responses with the correct CORS headers
  const sendJson = (data: any, status = 200) => {
    return new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  };

  // 3. Handle Preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // 4. Ensure POST method
  if (req.method !== "POST") {
    return sendJson({ error: "Method Not Allowed" }, 405);
  }

  // 5. Parse Body Safely
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return sendJson({ error: "Invalid JSON body" }, 400);
  }

  const clientIp = getClientIp(req);
  const action = (body.action || "register").toString();

  // ==========================================================
  // FLOW 1: PUBLIC REGISTRATION (Web)
  // ==========================================================
  if (action === "register") {
    const { name, place, phone, email } = body;

    // Validation
    if (!name || !place || !phone || !email) {
      return sendJson({ error: "Name, place, phone, and email are required." }, 400);
    }
    if (String(phone).length < 6) {
      return sendJson({ error: "Invalid phone number." }, 400);
    }

    // Rate Limit Check
    try {
      const cutoff = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();
      const { count, error } = await supabase
        .from("registrations")
        .select("id", { count: "exact", head: true })
        .gte("created_at", cutoff)
        .eq("ip", clientIp);

      if (!error && (count || 0) >= MAX_REGISTRATIONS_PER_IP) {
        return sendJson({ error: "Too many requests. Please try again later." }, 429);
      }
    } catch (e) {
      console.warn("Rate limit check failed", e);
    }

    // Duplicate Check (Email)
    try {
      const dupCutoff = new Date(Date.now() - DUPLICATE_WINDOW_HOURS * 3600000).toISOString();
      const { data: dup } = await supabase
        .from("registrations")
        .select("id")
        .eq("email", email)
        .gte("created_at", dupCutoff)
        .limit(1)
        .maybeSingle();

      if (dup) {
        return sendJson({ error: "This email has already been registered recently." }, 409);
      }
    } catch (e) {
      console.warn("Duplicate check failed", e);
    }

    // Create Token & Save
    const token = makeToken();
    
    // FIX: Define qrUrl so it can be returned safely
    const qrUrl = `${APP_BASE_URL}/affiliate/ticket.html?ref=${token}`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${token}`;

    const { error: insertError } = await supabase.from("registrations").insert([
      { name, place, phone, email, token, ip: clientIp }
    ]);

    if (insertError) {
      console.error("DB Insert Error:", insertError);
      return sendJson({ error: "Database error during registration." }, 500);
    }

    // Send Email (SendGrid)
    let emailSent = false;
    try {
      const sendPayload = {
        personalizations: [{ to: [{ email }] }],
        from: { email: FROM_EMAIL },
        subject: "Your Janatha Bazar Quick Response Code - Scan & Enter",
        content: [
          {
            type: "text/html",
            value: `
              <div style="font-family: sans-serif; color: #333; text-align: center;">
                <h2>Hello ${name},</h2>
                <p>Thank you for registering with Janatha Bazar.</p>
                
                <div style="margin: 20px 0;">
                  <img src="${qrImageUrl}" alt="Your QR Code" width="200" style="border: 2px solid #eee; border-radius: 8px;" />
                </div>
                
                <p><strong>Your Token:</strong> <span style="font-family: monospace; background: #eee; padding: 4px 8px;">${token}</span></p>
                
                <p>If the image above doesn't load, view your ticket here:<br/>
                <a href="${qrUrl}" style="color: #1f8a3a; font-weight: bold;">View Full Ticket</a></p>
                
                <p style="color: #666; font-size: 12px;">Show this QR code at our Kottakkal branch to get your printed ticket.</p>
              </div>
            `
          }
        ]
      };

      const mailRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendPayload)
      });


      if (mailRes.ok) emailSent = true;
      else console.error("SendGrid failed:", await mailRes.text());
      
    } catch (e) {
      console.error("Email exception:", e);
    }

    return sendJson({ status: "ok", token, qrUrl, email_sent: emailSent }, 201);
  }

  // ==========================================================
  // FLOW 2: BRANCH PRINT / VERIFY (Protected)
  // ==========================================================
  if (action === "print") {
    const { token } = body;
    if (!token) return sendJson({ error: "Missing token" }, 400);

    const branchId = req.headers.get("x-branch-id") || "default";
    const sigHeader = req.headers.get("x-branch-signature") || "";
    const tsHeader = req.headers.get("x-branch-timestamp") || "";

    if (!sigHeader || !tsHeader) {
      return sendJson({ error: "Missing signature headers" }, 401);
    }

    // Validate Timestamp (2 min window)
    const ts = Number(tsHeader);
    if (!ts || Math.abs(Date.now() - ts) > 2 * 60 * 1000) {
      return sendJson({ error: "Request expired (invalid timestamp)" }, 401);
    }

    // Verify HMAC
    if (!BRANCH_SECRET) {
      console.error("Configuration Error: BRANCH_SECRET is missing.");
      return sendJson({ error: "Server misconfiguration" }, 500);
    }

    const message = `${token}|${ts}|${branchId}`;
    const expectedSig = await hmacHex(BRANCH_SECRET, message);

    if (expectedSig !== sigHeader.toLowerCase()) {
      return sendJson({ error: "Invalid Signature" }, 401);
    }

    // Fetch Record
    const { data: record, error: fetchError } = await supabase
      .from("registrations")
      .select("*")
      .eq("token", token)
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      return sendJson({ error: "Database error" }, 500);
    }
    if (!record) {
      return sendJson({ error: "Token not found" }, 404);
    }

    // Mark as printed
    await supabase
      .from("registrations")
      .update({ printed_at: nowIso() })
      .eq("id", record.id);

    return sendJson({ status: "ok", record }, 200);
  }

  return sendJson({ error: "Unknown action" }, 400);
});