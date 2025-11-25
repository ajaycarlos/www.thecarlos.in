// Janathabazar.js - form handler
const form = document.getElementById('regForm');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const msg = document.getElementById('message');

// CONFIGURATION
const FUNC_URL = "https://cverpyenjypebliijddw.supabase.co/functions/v1/register";

// PASTE YOUR SUPABASE 'ANON' PUBLIC KEY HERE (From Supabase Dashboard > Project Settings > API)
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2ZXJweWVuanlwZWJsaWlqZGR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NDc2MDUsImV4cCI6MjA3OTUyMzYwNX0.coPFDAFQFAgoMLlnsCPsg7JrBCse_STP8H9sqU0bLaU";

function setMessage(text, style='') {
  msg.textContent = text;
  msg.style.color = style || '';
}

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  setMessage('', '');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Registering...';

  const payload = {
    name: document.getElementById('name').value.trim(),
    place: document.getElementById('place').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim()
  };

  // basic validation
  if (!payload.name || !payload.phone || !payload.email) {
    setMessage('Name, phone and email are required', 'orange');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Register & Get QR';
    return;
  }

  try {
    const res = await fetch(FUNC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // THIS IS THE FIX: Authorization header is required by Supabase Gateway
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(payload)
    });

    // Handle non-JSON errors gracefully
    let j;
    try {
      j = await res.json();
    } catch (e) {
      throw new Error(`Server status: ${res.status}`);
    }

    if (!res.ok) {
      setMessage(j.error || 'Registration failed', 'red');
    } else {
      setMessage('Registration successful — check your email for the QR', 'lightgreen');
      form.reset();
    }
  } catch (err) {
    console.error(err);
    setMessage('Network error or Unauthorized. Check console.', 'red');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Register & Get QR';
  }
});

resetBtn.addEventListener('click', () => {
  form.reset();
  setMessage('');
});