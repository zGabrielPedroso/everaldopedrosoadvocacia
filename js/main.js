/* ============================================================
   EVERALDO PEDROSO ADVOCACIA — Main JS
   ============================================================ */

(function () {
  'use strict';

  // ── ROUTER (SPA-style page switching) ─────────────────────
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('[data-page]');

  function showPage(id, pushState = true) {
    pages.forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + id);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'instant' });
      updateNavActive(id);
      if (pushState) {
        history.pushState({ page: id }, '', '#' + id);
      }
      // Re-trigger reveal animations for new page
      setTimeout(() => {
        observeReveal();
        runHeroAnimation();
      }, 50);
    }
  }

  function updateNavActive(id) {
    document.querySelectorAll('.navbar__link, .navbar__mobile-link').forEach(el => {
      el.classList.toggle('active', el.dataset.page === id);
    });
  }

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-page]');
    if (el) {
      e.preventDefault();
      const id = el.dataset.page;
      showPage(id);
      // Close mobile menu
      const mobileMenu = document.getElementById('mobileMenu');
      const hamburger = document.getElementById('hamburger');
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      }
    }
  });

  window.addEventListener('popstate', e => {
    const page = (e.state && e.state.page) || 'home';
    showPage(page, false);
  });

  // Initial load
  const hash = location.hash.replace('#', '') || 'home';
  showPage(hash, false);

  // ── NAVBAR ─────────────────────────────────────────────────
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // ── SCROLL REVEAL ──────────────────────────────────────────
  function observeReveal() {
    const items = document.querySelectorAll('[data-reveal]:not(.revealed)');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => observer.observe(el));
  }
  observeReveal();

  // ── HERO ANIMATION ─────────────────────────────────────────
  function runHeroAnimation() {
    const activePage = document.querySelector('.page.active');
    if (!activePage || activePage.id !== 'page-home') return;
    const animEls = activePage.querySelectorAll('.animate-up');
    animEls.forEach(el => {
      el.style.animationPlayState = 'running';
    });
  }
  runHeroAnimation();

  // ── CONTACT FORM ───────────────────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Enviando…';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = '✓ Mensagem Enviada';
        btn.style.background = '#1A7A3C';
        btn.style.borderColor = '#1A7A3C';
        btn.style.color = 'white';
        form.reset();
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 3500);
      }, 1400);
    });
  }

  // ── SMOOTH ANCHOR SCROLL ───────────────────────────────────
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(el.dataset.scroll);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();


(function () {
  const modal = document.getElementById('fraudModal');
  if (modal && !sessionStorage.getItem('fraudModalSeen')) {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeFraudModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    sessionStorage.setItem('fraudModalSeen', 'true');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-close-fraud]').forEach(btn => btn.addEventListener('click', closeFraudModal));

  document.querySelectorAll('.about-home__carousel').forEach(carousel => {
    const slides = carousel.querySelectorAll('.about-home__img-photo');
    const prev = carousel.querySelector('.about-home__carousel-btn--prev');
    const next = carousel.querySelector('.about-home__carousel-btn--next');
    if (!slides.length) return;
    let current = 0;
    const show = (index) => {
      slides.forEach((img, i) => img.classList.toggle('active', i === index));
      current = index;
    };
    prev && prev.addEventListener('click', () => show((current - 1 + slides.length) % slides.length));
    next && next.addEventListener('click', () => show((current + 1) % slides.length));
    setInterval(() => show((current + 1) % slides.length), 4500);
  });
})();

/* ── BLOG CARDS EXPANSÍVEIS ────────────────────────────────── */
(function () {
  function initExpandableCards() {
    document.querySelectorAll('[data-expandable]').forEach(card => {
      if (card.dataset.expandInit) return; // já inicializado
      card.dataset.expandInit = '1';
      card.addEventListener('click', function (e) {
        // Não fechar se o clique for num link interno (ex: CTA)
        if (e.target.closest('a[data-page]') || e.target.closest('a[href^="http"]')) return;
        const isOpen = card.classList.contains('is-expanded');
        // Fechar todos os outros abertos
        document.querySelectorAll('.blog-placeholder-card.is-expanded').forEach(other => {
          if (other !== card) other.classList.remove('is-expanded');
        });
        card.classList.toggle('is-expanded', !isOpen);
      });
    });
  }

  // Inicializar imediatamente e re-inicializar ao mudar de página
  initExpandableCards();
  const origObserve = window._revealObserverCallback;
  // Hook na troca de página via MutationObserver na page activa
  const mo = new MutationObserver(() => initExpandableCards());
  mo.observe(document.body, { childList: false, subtree: false, attributes: true, attributeFilter: ['class'] });
  document.querySelectorAll('.page').forEach(page => {
    mo.observe(page, { attributes: true, attributeFilter: ['class'] });
  });
})();
