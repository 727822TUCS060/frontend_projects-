// ====================================
// WANDERNEST TRAVELS - SITE SCRIPT
// ====================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile Menu Toggle ---------- */
  const menuBtn = document.getElementById('menu-btn');
  const navbar = document.getElementById('navbar');

  if (menuBtn && navbar) {
    menuBtn.addEventListener('click', function () {
      navbar.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when a nav link is clicked
    navbar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
      });
    });
  }

  /* ---------- FAQ Accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('h3');
    const answer = item.querySelector('p');
    const icon = item.querySelector('h3 i');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = answer.style.display === 'block';

        // Close all
        faqItems.forEach(el => {
          const p = el.querySelector('p');
          const i = el.querySelector('h3 i');
          if (p) p.style.display = 'none';
          if (i) i.style.transform = 'rotate(0deg)';
        });

        // Toggle current
        if (!isOpen) {
          answer.style.display = 'block';
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  /* ---------- Bestseller Carousel ---------- */
  const track = document.getElementById('bestsellerTrack');
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');

  if (track && prevBtn && nextBtn) {
    const scrollAmount = 320;

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  /* ---------- Booking Modal ---------- */
  const modal = document.getElementById('bookingModal');
  const closeModal = document.querySelector('.close-modal');
  const packageButtons = document.querySelectorAll('.package-btn');
  const selectedPackageInput = document.getElementById('selectedPackage');

  function openModal(packageName) {
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      if (selectedPackageInput && packageName) {
        selectedPackageInput.value = packageName;
      }
    }
  }

  function closeModalFn() {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  packageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const packageName = btn.getAttribute('data-package') || '';
      openModal(packageName);
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', closeModalFn);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModalFn();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModalFn();
  });

  /* ---------- Booking Form Submit (demo) ---------- */
  const travelForm = document.getElementById('travelForm');
  if (travelForm) {
    travelForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you! Our travel expert will contact you within 1 hour.');
      closeModalFn();
      travelForm.reset();
    });
  }

  /* ---------- Quick Inquiry Form Submit (demo) ---------- */
  const quickForm = document.querySelector('.contact-form form');
  if (quickForm) {
    quickForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thanks for reaching out! We will get back to you shortly.');
      quickForm.reset();
    });
  }

  /* ---------- Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navbar a');

  function setActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active-nav');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

});
