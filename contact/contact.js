/* ============================================================
   YOUR WAY TRAVEL — contact.js
   Contact form validation and EmailJS submission.

   ════════════════════════════════════════════════════════════
   EMAILJS SETUP — COMPLETE THESE 4 STEPS BEFORE GOING LIVE
   ════════════════════════════════════════════════════════════

   STEP 1: Create a free EmailJS account
     → Go to https://www.emailjs.com and sign up (free tier allows 200 emails/month)

   STEP 2: Add your Gmail service
     → In the EmailJS dashboard, go to "Email Services"
     → Click "Add New Service" → choose Gmail
     → Connect your account: yourwaytrav3l@gmail.com
     → EmailJS will show you a SERVICE ID (looks like "service_xxxxxxx")
     → Copy it and paste it into EMAILJS_SERVICE_ID below

   STEP 3: Create an email template
     → In the dashboard, go to "Email Templates" → "Create New Template"
     → Set "To Email" to: yourwaytrav3l@gmail.com
     → Use these variable names in the template body (they match the form fields):
         {{name}}          — sender's full name
         {{email}}         — sender's email address
         {{destinations}}  — desired destinations
         {{budget}}        — selected budget range
         {{wishlist}}      — wishlist / notes
     → Example template subject: "New Trip Inquiry from {{name}}"
     → Save the template. EmailJS shows you a TEMPLATE ID (like "template_xxxxxxx")
     → Copy it and paste it into EMAILJS_TEMPLATE_ID below

   STEP 4: Get your Public Key
     → In the dashboard, go to Account → "API Keys"
     → Copy your PUBLIC KEY and paste it into EMAILJS_PUBLIC_KEY below

   ════════════════════════════════════════════════════════════
   PASTE YOUR CREDENTIALS BELOW:
   ════════════════════════════════════════════════════════════ */

const EMAILJS_PUBLIC_KEY   = 'AxRq3rXIU1RP-acB_';    // ← Replace with your EmailJS Public Key
const EMAILJS_SERVICE_ID   = 'service_r2rqu8y';    // ← Replace with your EmailJS Service ID
const EMAILJS_TEMPLATE_ID  = 'template_c1ybji5';   // ← Replace with your EmailJS Template ID

/* ════════════════════════════════════════════════════════════
   You do not need to modify anything below this line.
   ════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Initialize EmailJS with your Public Key ── */
  emailjs.init(EMAILJS_PUBLIC_KEY);

  const form      = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const feedback  = document.getElementById('form-feedback');


  /* ── Form Submission ── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous feedback
    clearFeedback();

    // Validate all fields before sending
    if (!validateForm()) return;

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    /* ── Build template parameters ──
       These key names must match the variables in your EmailJS template.
       e.g. {{name}}, {{email}}, {{destinations}}, {{budget}}, {{wishlist}}
    ── */
    const templateParams = {
      name:         document.getElementById('name').value.trim(),
      email:        document.getElementById('email').value.trim(),
      destinations: document.getElementById('destinations').value.trim(),
      budget:       document.getElementById('budget').value,
      wishlist:     document.getElementById('wishlist').value.trim() || 'No notes provided.',
    };

    /* ── Send via EmailJS ── */
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        showFeedback('success',
          '✅ Your inquiry has been sent! We\'ll be in touch within 1–2 business days.');
        form.reset();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        showFeedback('error',
          '❌ Something went wrong. Please try again or email us directly at yourwaytrav3l@gmail.com');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send My Inquiry';
      });
  });


  /* ── Field Validation ── */
  function validateForm() {
    let valid = true;

    // Name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
      setError(name, 'error-name', 'Please enter your full name.');
      valid = false;
    }

    // Email — basic format check
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      setError(email, 'error-email', 'Please enter your email address.');
      valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      setError(email, 'error-email', 'Please enter a valid email address.');
      valid = false;
    }

    // Destinations
    const destinations = document.getElementById('destinations');
    if (!destinations.value.trim()) {
      setError(destinations, 'error-destinations', 'Please enter at least one desired destination.');
      valid = false;
    }

    // Budget
    const budget = document.getElementById('budget');
    if (!budget.value) {
      setError(budget, 'error-budget', 'Please select a budget range.');
      valid = false;
    }

    return valid;
  }

  function setError(input, errorId, message) {
    input.classList.add('invalid');
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = message;

    // Clear error on input change
    input.addEventListener('input', () => {
      input.classList.remove('invalid');
      if (errorEl) errorEl.textContent = '';
    }, { once: true });
  }

  function clearFeedback() {
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    // Clear all field errors
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  }

  function showFeedback(type, message) {
    feedback.className = `form-feedback ${type}`;
    feedback.textContent = message;
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

});
