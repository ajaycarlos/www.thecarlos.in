// Janathabazar.js - form handler
const form = document.getElementById('regForm');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const msg = document.getElementById('message');

// set this to your deployed Supabase function URL
const FUNC_URL = "https://cverpyenjypebliijddw.supabase.co/functions/v1/register";

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
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    const j = await res.json();
    if (!res.ok) {
      setMessage(j.error || 'Registration failed', 'red');
    } else {
      setMessage('Registration successful — check your email for the QR', 'lightgreen');
      form.reset();
    }
  } catch (err) {
    setMessage('Network error, try again', 'red');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Register & Get QR';
  }
});

resetBtn.addEventListener('click', () => {
  form.reset();
  setMessage('');
});
