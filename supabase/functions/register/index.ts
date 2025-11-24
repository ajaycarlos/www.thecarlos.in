// production-safe register function (no stack traces, CORS safe)
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const PROJECT_URL = Deno.env.get("PROJECT_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SERVICE_ROLE_KEY")!;
const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY")!;
const FROM_EMAIL = Deno.env.get("FROM_EMAIL")!;
const APP_BASE_URL = Deno.env.get("APP_BASE_URL") || "https://thecarlos.in";

const supabase = createClient(PROJECT_URL, SERVICE_ROLE_KEY);

const ALLOWED_ORIGINS = ["https://thecarlos.in", "https://www.thecarlos.in"];
function corsHeadersFromRequest(req: Request) {
  const origin = req.headers.get("origin") || "";
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400"
  };
}

function makeToken() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

serve(async (req) => {
  // Preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: { ...corsHeadersFromRequest(req), "Content-Length": "0" }
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeadersFromRequest(req) }
    });
  }

  let body;
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeadersFromRequest(req) }
    });
  }

  const { name, place, phone, email } = body || {};
  if (!name || !place || !phone || !email) {
    return new Response(JSON.stringify({ error: "missing_fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeadersFromRequest(req) }
    });
  }

  // Rate-limit safeguard (best-effort)
  try {
    const { data: recent } = await supabase
      .from("registrations")
      .select("created_at")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1);
    if (recent && recent.length > 0) {
      const last = new Date(recent[0].created_at);
      if ((Date.now() - last.getTime()) < (60 * 1000)) {
        return new Response(JSON.stringify({ error: "too_many_requests" }), {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeadersFromRequest(req) }
        });
      }
    }
  } catch (e) {
    // continue — best-effort
  }

  const token = makeToken();
  const qrUrl = `${APP_BASE_URL}/r/${token}`;

  // Insert
  const { error: dbError } = await supabase
    .from("registrations")
    .insert([{ name, place, phone, email, token }]);

  if (dbError) {
    return new Response(JSON.stringify({ error: "db_error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeadersFromRequest(req) }
    });
  }

  // SendGrid email (best-effort)
  let emailSent = false;
  try {
    const sendPayload = {
      personalizations: [{ to: [{ email }] }],
      from: { email: FROM_EMAIL },
      subject: "Your Janatha Bazar QR Code",
      content: [
        {
          type: "text/html",
          value: `<p>Hello ${name},</p><p>Your QR code: <a href="${qrUrl}">${qrUrl}</a></p>`
        }
      ]
    };
    await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: { Authorization: `Bearer ${SENDGRID_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(sendPayload)
    });
    emailSent = true;
  } catch (e) {
    emailSent = false;
  }

  return new Response(JSON.stringify({ status: "ok", token, qrUrl, email_sent: emailSent }), {
    status: 201,
    headers: { "Content-Type": "application/json", ...corsHeadersFromRequest(req) }
  });
});
