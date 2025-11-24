// index.ts - Supabase Edge Function (Deno)
// PUBLIC registration + HMAC-protected print/verify action
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ----- CONFIG FROM ENV -----
const PROJECT_URL = Deno.env.get("PROJECT_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SERVICE_ROLE_KEY")!;
const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY")!;
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "ajaypulikkal940@gmail.com";
const APP_BASE_URL = Deno.env.get("APP_BASE_URL") || "https://thecarlos.in";

// Single branch secret for initial setup (rotate/extend to multiple branch secrets if needed)
const BRANCH_SECRET = Deno.env.get("BRANCH_SECRET") || ""; // keep secret
// security tuning
const RATE_LIMIT_WINDOW_MINUTES = Number(Deno.env.get("RATE_LIMIT_WINDOW_MINUTES") || "10");
const MAX_REGISTRATIONS_PER_IP = Number(Deno.env.get("MAX_REGISTRATIONS_PER_IP") || "15");
const DUPLICATE_WINDOW_HOURS = Number(Deno.env.get("DUPLICATE_WINDOW_HOURS") || "24");

const supabase = createClient(PROJECT_URL, SERVICE_ROLE_KEY);

// ----- CORS -----
const ALLOWED_ORIGIN = "https://www.thecarlos.in"; // update if you use https://thecarlos.in or both
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Branch-Id, X-Branch-Signature, X-Branch-Timestamp",
    "Access-Control-Max-Age": "86400"
  };
}

// ----- utilities -----
function jsonResponse(obj: any, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() }
  });
}

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

function parseJsonSafe(req: Request) {
  return req.json().catch(() => null);
}

function getClientIp(req: Request) {
  // Supabase edge may forward IP in x-forwarded-for
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr;
  return "unknown";
}

// ----- token generator -----
function makeToken() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

// ----- Main handler -----
serve(async (req: Request) => {
  // Handle preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: { ...corsHeaders(), "Content-Length": "0" } });
  }
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders() });
  }

  const body = await parseJsonSafe(req);
  if (!body) {
    return jsonResponse({ error: "invalid_json" }, 400);
  }

  const clientIp = getClientIp(req);

  // Two actions supported:
  // action = "register"  --> public web registration (name/place/phone/email) => returns token & qrUrl
  // action = "print"     --> branch call (token + signed header) => returns record details (for printing)
  const action = (body.action || "register").toString();

  // --- REGISTER FLOW (web) ---
  if (action === "register") {
    const { name, place, phone, email } = body;
    // basic validation
    if (!name || !place || !phone || !email) {
      return jsonResponse({ error: "missing_fields" }, 400);
    }
    if (typeof phone !== "string" || phone.length < 6) {
      return jsonResponse({ error: "invalid_phone" }, 400);
    }

    // rate limit: count recent registrations from same IP
    try {
      const cutoff = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();
      const countRes = await supabase
        .from("registrations")
        .select("id", { count: "exact" })
        .gte("created_at", cutoff)
        .eq("ip", clientIp);
      if (countRes.error) {
        console.warn("rate-limit query error:", countRes.error);
      } else {
        const count = (countRes.count || 0) as number;
        if (count >= MAX_REGISTRATIONS_PER_IP) {
          return jsonResponse({ error: "rate_limited" }, 429);
        }
      }
    } catch (e) {
      console.warn("rate-limit exception", e);
    }

    // duplicate check: same email recently
    try {
      const dupCutoff = new Date(Date.now() - DUPLICATE_WINDOW_HOURS * 3600000).toISOString();
      const dup = await supabase
        .from("registrations")
        .select("id")
        .eq("email", email)
        .gte("created_at", dupCutoff)
        .limit(1)
        .maybeSingle();
      if (!dup.error && dup.data) {
        return jsonResponse({ error: "duplicate_recent" }, 409);
      }
    } catch (e) {
      console.warn("duplicate check error", e);
    }

    // produce token and insert
    const token = makeToken();
    const qrUrl = `${APP_BASE_URL}/r/${token}`;

    try {
      const insert = await supabase.from("registrations").insert([
        { name, place, phone, email, token, ip: clientIp }
      ]);
      if (insert.error) {
        console.error("db insert error", insert.error);
        return jsonResponse({ error: "db_error", details: insert.error }, 500);
      }
    } catch (e) {
      console.error("insert exception", e);
      return jsonResponse({ error: "db_error", details: String(e) }, 500);
    }

    // Attempt to send email (best effort)
    let emailSent = false;
    try {
      const sendPayload = {
        personalizations: [{ to: [{ email }] }],
        from: { email: FROM_EMAIL },
        subject: "Your registration QR from Janatha Bazar",
        content: [
          {
            type: "text/html",
            value: `
              <p>Hello ${name},</p>
              <p>Your QR link for Janatha Bazar: <a href="${qrUrl}">${qrUrl}</a></p>
              <p>Show this QR at the branch to collect your printed ticket.</p>
            `
          }
        ]
      };
      await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendPayload)
      });
      emailSent = true;
    } catch (e) {
      console.warn("sendgrid error", e);
      emailSent = false;
    }

    return jsonResponse({ status: "ok", token, qrUrl, email_sent: emailSent }, 201);
  }

  // --- PRINT / VERIFY FLOW (branch) ---
  if (action === "print") {
    const { token } = body;
    if (!token) return jsonResponse({ error: "missing_token" }, 400);

    // Branch auth via headers:
    const branchId = req.headers.get("x-branch-id") || "default";
    const sigHeader = req.headers.get("x-branch-signature") || "";
    const tsHeader = req.headers.get("x-branch-timestamp") || "";

    if (!sigHeader || !tsHeader) {
      return jsonResponse({ error: "missing_signature" }, 401);
    }

    // Validate timestamp (prevent replay)
    const ts = Number(tsHeader);
    if (!ts || Math.abs(Date.now() - ts) > 2 * 60 * 1000) { // 2 minute window
      return jsonResponse({ error: "invalid_timestamp" }, 401);
    }

    // Build message and verify HMAC
    const message = `${token}|${ts}|${branchId}`;
    // For now we support a single BRANCH_SECRET. Extend to mapping if you need per-branch secrets.
    if (!BRANCH_SECRET) {
      return jsonResponse({ error: "branch_secret_not_configured" }, 500);
    }

    try {
      const expected = await hmacHex(BRANCH_SECRET, message);
      // header may be hex lower/upper - normalize
      if (expected !== sigHeader.toLowerCase()) {
        return jsonResponse({ error: "invalid_signature" }, 401);
      }
    } catch (e) {
      console.error("hmac verify error", e);
      return jsonResponse({ error: "invalid_signature" }, 401);
    }

    // Fetch registration by token
    try {
      const get = await supabase.from("registrations").select("*").eq("token", token).limit(1).maybeSingle();
      if (get.error) {
        console.error("db fetch error", get.error);
        return jsonResponse({ error: "db_error", details: get.error }, 500);
      }
      if (!get.data) return jsonResponse({ error: "token_not_found" }, 404);

      // Optionally mark printed: update printed boolean or increment print_count
      await supabase
        .from("registrations")
        .update({ printed_at: nowIso() })
        .eq("id", get.data.id);

      // Return the data necessary for printing
      return jsonResponse({ status: "ok", record: get.data }, 200);
    } catch (e) {
      console.error("print error", e);
      return jsonResponse({ error: "server_error", details: String(e) }, 500);
    }
  }

  // Unknown action
  return jsonResponse({ error: "unknown_action" }, 400);
});
