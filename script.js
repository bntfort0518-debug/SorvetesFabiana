/* =========================================
   SORVETERIA FABIANA — Interações
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- MENU MOBILE ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = navMenu.querySelectorAll('a');

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    menuBtn.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', toggleMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* Fechar menu com ESC */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      menuBtn.focus();
    }
  });

  /* ---------- HEADER SCROLL ---------- */
  const header = document.getElementById('header');

  function handleScroll() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------- ANIMAÇÕES DE ENTRADA ---------- */
  const fadeElements = document.querySelectorAll('.card, .sobre__diferencial, .localizacao__info-card, .sobre__image-wrapper, .localizacao__mapa, .avaliacoes__card');

  fadeElements.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));

  /* ---------- TELEFONE CLICÁVEL ---------- */
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function () {
      this.style.color = 'var(--verde)';
      setTimeout(() => { this.style.color = ''; }, 300);
    });
  });

  /* ---------- MODAL PRODUTO ---------- */
  const modal = document.getElementById('productModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalCta = document.getElementById('modalCta');
  const cards = document.querySelectorAll('.card[data-name]');

  function openModal(card) {
    const name = card.dataset.name;
    const desc = card.dataset.desc;
    const img = card.dataset.img;

    modalImage.src = img;
    modalImage.alt = name;
    modalTitle.textContent = name;
    modalDesc.textContent = desc;
    modalCta.href = `https://wa.me/554136667908?text=${encodeURIComponent('Olá! Gostaria de pedir: ' + name)}`;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';

    /* Foco no botão de fechar para acessibilidade */
    setTimeout(() => modal.querySelector('.modal__close').focus(), 100);
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  /* Clique nos cards */
  cards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  /* Fechar modal: botão X e backdrop */
  modal.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  /* Fechar com ESC */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

});
