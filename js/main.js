// =====================================================
//  WESTRIDGE ACADEMY — Shared JavaScript
// =====================================================

// ---- Tailwind Config ----
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter',           'sans-serif'],
        display: ['Playfair Display','serif'],
      },
      colors: {
        gold: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
    },
  },
};

// ---- Run after DOM loads ----
document.addEventListener('DOMContentLoaded', () => {

  // -- Mobile menu toggle --
  const toggle    = document.getElementById('mobile-toggle');
  const menu      = document.getElementById('mobile-menu');
  const iconOpen  = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');
  let menuOpen = false;

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menuOpen = !menuOpen;
      if (menuOpen) {
        menu.style.maxHeight = menu.scrollHeight + 200 + 'px';
        menu.style.opacity   = '1';
        iconOpen  && iconOpen.classList.add('hidden');
        iconClose && iconClose.classList.remove('hidden');
      } else {
        menu.style.maxHeight = '0';
        menu.style.opacity   = '0';
        iconOpen  && iconOpen.classList.remove('hidden');
        iconClose && iconClose.classList.add('hidden');
      }
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        menu.style.maxHeight = '0';
        menu.style.opacity   = '0';
        iconOpen  && iconOpen.classList.remove('hidden');
        iconClose && iconClose.classList.add('hidden');
      });
    });
  }

  // -- Navbar scroll shadow --
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('shadow-xl', window.scrollY > 50);
      navbar.classList.toggle('shadow-black/20', window.scrollY > 50);
    });
  }

  // -- Highlight active nav link based on current page --
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // -- Scroll reveal --
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // -- Filter tabs (programs / events pages) --
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.dataset.group || 'default';
      document.querySelectorAll(`.filter-tab[data-group="${group}"]`).forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      document.querySelectorAll(`[data-category]`).forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  // -- Contact form --
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('send-message-btn');
      if (!btn) return;
      const orig = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(to right,#059669,#10b981)';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  // -- Newsletter --
  const nlBtn   = document.getElementById('newsletter-btn');
  const nlInput = document.getElementById('newsletter-email');
  if (nlBtn && nlInput) {
    nlBtn.addEventListener('click', () => {
      if (nlInput.value.includes('@')) {
        nlBtn.textContent = '✓';
        nlBtn.classList.replace('bg-blue-600','bg-emerald-600');
        nlInput.value = '';
        setTimeout(() => {
          nlBtn.textContent = '→';
          nlBtn.classList.replace('bg-emerald-600','bg-blue-600');
        }, 2500);
      } else {
        nlInput.style.borderColor = '#ef4444';
        setTimeout(() => nlInput.style.borderColor = '', 1500);
      }
    });
  }

  // -- Lightbox (gallery page) --
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-trigger').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
  }

});
