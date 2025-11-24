// register/index.ts  (safe version - DO NOT put secrets here)
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY")!;
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "no-reply@thecarlos.in";
const APP_BASE_URL = Deno.env.get("APP_BASE_URL") || "https://thecarlos.in";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function makeToken() {
  return Math.random().toString(36).slice(2,10).toUpperCase();
}

serve(async (req) => {
  try {
    if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
    const body = await req.json();
    const { name, place, phone, email } = body || {};
    if (!name || !phone || !email) {
      return new Response(JSON.stringify({ error: "name, phone, email required" }), { status: 400 });
    }

    const token = makeToken();
    const qrUrl = `${APP_BASE_URL}/r/${token}`;

    // Insert into DB
    const { error: insertErr } = await supabase
      .from("registrations")
      .insert([{ token, name, place, phone, email }]);

    if (insertErr) {
      console.error("DB insert error", insertErr);
      return new Response(JSON.stringify({ error: "db_error" }), { status: 500 });
    }

    // Build QR image URL via public QR service
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrUrl)}`;

    // Prepare SendGrid payload (reads API key from env)
    const emailBody = {
      personalizations: [{ to: [{ email }], subject: "Your Janatha Bazar Lottery QR" }],
      from: { email: FROM_EMAIL, name: "Janatha Bazar" },
      content: [
        { type: "text/plain", value: `Hello ${name},\n\nOpen this link to your QR: ${qrUrl}` },
        { type: "text/html", value: `<p>Hello ${name},</p><p>Thanks for registering. Show this QR at Janatha Bazar Kottakkal to print your ticket.</p><p><img src="${qrImageUrl}" alt="QR" /></p><p>Link: <a href="${qrUrl}">${qrUrl}</a></p>` }
      ]
    };

    const sgRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailBody)
    });

    if (!sgRes.ok) {
      const text = await sgRes.text();
      console.error("SendGrid error", sgRes.status, text);
      return new Response(JSON.stringify({ status: "ok", token, qrUrl, email_sent: false }), { status: 201 });
    }

    return new Response(JSON.stringify({ status: "ok", token, qrUrl, email_sent: true }), { status: 201 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "server_error" }), { status: 500 });
  }
});
