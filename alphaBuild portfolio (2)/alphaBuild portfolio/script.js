/* ===================================================
   AlphaBuild AI Solutions — script.js (FIXED)
   ✅ FIXED: Corrected EmailJS field mapping
   =================================================== */

'use strict';

/* ─────────────────────────────────────────────────
   1. STICKY HEADER
───────────────────────────────────────────────── */
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ─────────────────────────────────────────────────
   2. MOBILE MENU
───────────────────────────────────────────────── */
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
}

/* ─────────────────────────────────────────────────
   3. SMOOTH SCROLL — fixed header offset fix
───────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const headerHeight = header ? header.offsetHeight : 70;
    const annoBar = document.getElementById('announcementBar');
    const annoHeight = (annoBar && annoBar.style.display !== 'none') ? annoBar.offsetHeight : 0;
    const offset = target.getBoundingClientRect().top + window.scrollY - headerHeight - annoHeight - 10;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

/* ─────────────────────────────────────────────────
   4. SCROLL TO TOP
───────────────────────────────────────────────── */
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────────────
   5. FAQ ACCORDION
───────────────────────────────────────────────── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-answer').classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ─────────────────────────────────────────────────
   6. ACTIVE NAV LINK ON SCROLL
───────────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, {
  root: null,
  rootMargin: '-30% 0px -60% 0px',
  threshold: 0
});

sections.forEach(section => sectionObserver.observe(section));

/* ─────────────────────────────────────────────────
   7. ANIMATE ON SCROLL
───────────────────────────────────────────────── */
const animateEls = document.querySelectorAll(
  '.service-card, .why-card, .portfolio-card, .testimonial-card, ' +
  '.price-card, .step, .faq-item, .contact-detail-item, .social-proof-bar'
);

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animateEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${(i % 6) * 0.08}s, transform 0.5s ease ${(i % 6) * 0.08}s`;
  animObserver.observe(el);
});

/* ─────────────────────────────────────────────────
   8. ANNOUNCEMENT BAR CLOSE
───────────────────────────────────────────────── */
const announcementBar = document.getElementById('announcementBar');
if (announcementBar) {
  if (sessionStorage.getItem('annoClosed') === '1') {
    announcementBar.style.display = 'none';
  }
  const barCloseBtn = announcementBar.querySelector('.bar-close');
  if (barCloseBtn) {
    barCloseBtn.addEventListener('click', () => {
      announcementBar.style.display = 'none';
      sessionStorage.setItem('annoClosed', '1');
    });
  }
}

/* ─────────────────────────────────────────────────
   9. EXIT INTENT POPUP
───────────────────────────────────────────────── */
(function () {
  const popup   = document.getElementById('exitPopup');
  const overlay = document.getElementById('exitOverlay');
  const closeBtn= document.getElementById('exitClose');
  if (!popup || !overlay) return;

  if (sessionStorage.getItem('exitShown') === '1') return;

  let shown = false;

  function showPopup() {
    if (shown) return;
    shown = true;
    sessionStorage.setItem('exitShown', '1');
    popup.style.display = 'flex';
    overlay.style.display = 'block';
    popup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function hidePopup() {
    popup.style.display = 'none';
    overlay.style.display = 'none';
    popup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0) showPopup();
  });

  if (/Mobi|Android/i.test(navigator.userAgent)) {
    setTimeout(showPopup, 30000);
  }

  if (closeBtn)  closeBtn.addEventListener('click', hidePopup);
  if (overlay)   overlay.addEventListener('click', hidePopup);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && shown) hidePopup();
  });
})();

/* ─────────────────────────────────────────────────
   10. SOCIAL PROOF COUNTER ANIMATION
───────────────────────────────────────────────── */
(function () {
  const bar = document.querySelector('.social-proof-bar');
  if (!bar) return;

  const items = [
    { el: bar.querySelectorAll('.sp-item strong')[0], end: 15, suffix: '+', prefix: '' },
    { el: bar.querySelectorAll('.sp-item strong')[1], end: 5.0, suffix: '', prefix: '★ ', decimals: 1 },
    { el: bar.querySelectorAll('.sp-item strong')[2], end: 2000, suffix: '', prefix: '₹', separator: true },
  ];

  function animateCount(item) {
    if (!item.el) return;
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      let val = eased * item.end;
      let display;
      if (item.decimals) {
        display = val.toFixed(item.decimals);
      } else if (item.separator) {
        display = Math.round(val).toLocaleString('en-IN');
      } else {
        display = Math.round(val);
      }
      item.el.textContent = item.prefix + display + item.suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  let triggered = false;
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      items.forEach(item => animateCount(item));
    }
  }, { threshold: 0.5 });
  counterObserver.observe(bar);
})();

/* ─────────────────────────────────────────────────
   11. EMAILJS INITIALIZATION (FIXED)
   ✅ FIXED: Proper public key initialization
───────────────────────────────────────────────── */
// Initialize EmailJS with your public key (DO NOT USE PRIVATE KEY!)
document.addEventListener('DOMContentLoaded', function() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("Khlxz-qRecW-qIuze");
    console.log('✅ EmailJS initialized successfully');
  }
});

/* ─────────────────────────────────────────────────
   12. CONTACT FORM SUBMISSION (FIXED)
   ✅ FIXED: Corrected field mapping for EmailJS template
───────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const statusEl    = document.getElementById('status');

// Field validation helpers
function setFieldError(input, msg) {
  input.classList.add('field-error');
  let errEl = input.parentElement.querySelector('.field-err-msg');
  if (!errEl) {
    errEl = document.createElement('span');
    errEl.className = 'field-err-msg';
    errEl.style.cssText = 'color:#ef4444;font-size:.78rem;margin-top:4px;display:block;';
    input.parentElement.appendChild(errEl);
  }
  errEl.textContent = msg;
}

function clearFieldError(input) {
  input.classList.remove('field-error');
  const errEl = input.parentElement.querySelector('.field-err-msg');
  if (errEl) errEl.remove();
}

function validatePhone(phone) {
  return /^[\+]?[\d\s\-()]{8,15}$/.test(phone);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {
  // Clear errors on input
  contactForm.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('input', () => clearFieldError(input));
    input.addEventListener('change', () => clearFieldError(input));
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot check
    const honey = contactForm.querySelector('input[name="_honey"]');
    if (honey && honey.value) {
      console.warn('Bot submission blocked.');
      return;
    }

    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnSpan   = submitBtn.querySelector('span');
    const origText  = btnSpan.textContent;

    // Get form values
    const nameInput    = document.getElementById('name');
    const emailInput   = document.getElementById('email');
    const phoneInput   = document.getElementById('phone');
    const businessInput = document.getElementById('business');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');

    // ✅ FIXED: Correct field names matching your EmailJS template
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      business: businessInput.value.trim(),
      service: serviceInput.value || 'Not specified',
      message: messageInput.value.trim()
    };

    // Validation
    let hasError = false;
    
    if (!formData.name) {
      setFieldError(nameInput, 'Please enter your name.');
      hasError = true;
    }
    
    if (!formData.email || !validateEmail(formData.email)) {
      setFieldError(emailInput, 'Please enter a valid email address.');
      hasError = true;
    }
    
    if (!formData.phone || !validatePhone(formData.phone)) {
      setFieldError(phoneInput, 'Please enter a valid phone number (8-15 digits).');
      hasError = true;
    }
    
    if (!formData.message) {
      setFieldError(messageInput, 'Please tell us about your project.');
      hasError = true;
    }

    if (hasError) return;

    // Show loading state
    submitBtn.disabled = true;
    btnSpan.textContent = 'Sending…';
    submitBtn.querySelector('i').className = 'fa-solid fa-spinner fa-spin';
    if (statusEl) { 
      statusEl.className = ''; 
      statusEl.textContent = ''; 
    }

    try {
      // Send email via EmailJS
      if (typeof emailjs !== 'undefined') {
        const response = await emailjs.send(
          "service_dafe023",      // Your service ID
          "template_d2gf0kb",     // Your template ID
          formData               // Form data with correct field names
        );
        
        console.log('✅ Email sent successfully:', response);

        // Success message
        if (statusEl) {
          statusEl.className = 'success';
          statusEl.textContent = '✅ Thank you! We\'ll contact you within 24 hours.';
        }
        
        contactForm.reset();

        // Open WhatsApp as backup channel
        const waMsg = `Hi AlphaBuild! I submitted your contact form.\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}`;
        setTimeout(() => {
          window.open(`https://wa.me/916383197237?text=${encodeURIComponent(waMsg)}`, '_blank');
        }, 1500);

      } else {
        throw new Error('EmailJS not loaded');
      }

    } catch (err) {
      console.error('❌ EmailJS error:', err);
      
      if (statusEl) {
        statusEl.className = 'error';
        statusEl.textContent = '⚠️ Email error. Please WhatsApp us at +91 6383197237 or try again.';
      }

      // Log detailed error for debugging
      console.error('Error details:', {
        status: err.status,
        text: err.text,
        message: err.message
      });

    } finally {
      // Reset button state
      submitBtn.disabled = false;
      btnSpan.textContent = origText;
      submitBtn.querySelector('i').className = 'fa-solid fa-paper-plane';
    }
  });
}

/* ─────────────────────────────────────────────────
   13. WHATSAPP FLOAT — hide on mobile keyboard
───────────────────────────────────────────────── */
(function () {
  const waFloat = document.getElementById('whatsappBtn');
  if (!waFloat) return;

  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      if (window.innerWidth < 768) waFloat.style.opacity = '0';
    });
    input.addEventListener('blur', () => {
      waFloat.style.opacity = '1';
    });
  });
})();

/* ─────────────────────────────────────────────────
   14. CTA CLICK TRACKING
───────────────────────────────────────────────── */
(function () {
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
      console.log('[AlphaBuild] WhatsApp CTA clicked from:', link.closest('section')?.id || 'nav/footer');
    });
  });
})();