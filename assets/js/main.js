/**
 * PERFECT ENGLISH SCHOOL PUNNAKKAL
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle & Drawer
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  let navBackdrop = document.getElementById('navBackdrop');

  if (!navBackdrop) {
    navBackdrop = document.createElement('div');
    navBackdrop.id = 'navBackdrop';
    navBackdrop.className = 'nav-backdrop';
    document.body.appendChild(navBackdrop);
  }

  const openDrawer = () => {
    navMenu?.classList.add('open');
    navToggle?.classList.add('open');
    navToggle?.setAttribute('aria-expanded', 'true');
    navBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    navMenu?.classList.remove('open');
    navToggle?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Close button inside drawer
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    // Close on backdrop click
    navBackdrop.addEventListener('click', closeDrawer);

    // Close on link click
    navMenu.querySelectorAll('.nav-link, .mobile-nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // 2. Sticky Navbar Shadow Effect
  const header = document.querySelector('.header-main');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other open faqs
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // 4. Admission Modal Handler
  const modalBackdrop = document.getElementById('admissionModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openModalBtns = document.querySelectorAll('[data-open-modal="admission"]');

  const openModal = () => {
    if (modalBackdrop) {
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('active')) {
      closeModal();
    }
  });

  // 5. Toast Notification System
  const showToast = (message, isError = false) => {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.style.background = isError ? '#ef4444' : '#10b981';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        ${isError 
          ? '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>' 
          : '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'}
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  };

  // 6. Generic Form Submission Interceptor
  const handleFormSubmit = (form, successMsg) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting... ⏳';
      }

      // Simulate sending to school management
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        form.reset();
        closeModal();
        showToast(successMsg || 'Thank you! Your enquiry has been received. Our admissions team will contact you shortly.');
      }, 900);
    });
  };

  const modalForm = document.getElementById('admissionForm');
  if (modalForm) handleFormSubmit(modalForm, '🎉 Admission enquiry received! We will call you within 24 hours.');

  const quickForm = document.getElementById('quickAdmissionForm');
  if (quickForm) handleFormSubmit(quickForm, '✨ Callback requested! Our Punnakkal team will call you soon.');

  const contactPageForm = document.getElementById('contactPageForm');
  if (contactPageForm) handleFormSubmit(contactPageForm, '💌 Thank you for reaching out! We will reply to your message promptly.');

  // 7. Animated Numbers on Scroll (Stats Counter)
  const statNumbers = document.querySelectorAll('.stat-num');
  let animated = false;

  const animateStats = () => {
    if (animated) return;
    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      animated = true;
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target') || stat.textContent, 10);
        if (isNaN(target)) return;
        const suffix = stat.getAttribute('data-suffix') || '';
        let count = 0;
        const increment = Math.ceil(target / 40);
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            stat.textContent = target + suffix;
            clearInterval(timer);
          } else {
            stat.textContent = count + suffix;
          }
        }, 30);
      });
    }
  };

  window.addEventListener('scroll', animateStats);
  animateStats(); // Run once on load
});
