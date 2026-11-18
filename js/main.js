/**
 * Dra. Patrícia Botelho Marandola - Scripts e Interações
 * Desenvolvido por: Mickael Soares
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa os ícones Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Header scroll shadow effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('header-scrolled');
    } else {
      header?.classList.remove('header-scrolled');
    }
  });

  // Accordion FAQ: Fecha os outros itens ao abrir um novo
  const faqItems = document.querySelectorAll('#faq details');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.open) {
            otherItem.open = false;
          }
        });
      }
    });
  });

  // Smooth scroll com offset para compensar o header fixo
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // Lightbox da galeria de resultados
  const lightbox = document.getElementById('resultado-lightbox');
  const lightboxTriggers = Array.from(document.querySelectorAll('[data-lightbox-item]'));
  if (lightbox && lightboxTriggers.length > 0) {
    const imgEl = document.getElementById('lightbox-img');
    const tagEl = document.getElementById('lightbox-tag');
    const titleEl = document.getElementById('lightbox-title');
    const descEl = document.getElementById('lightbox-desc');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    let currentIndex = 0;

    const renderLightbox = (index) => {
      currentIndex = (index + lightboxTriggers.length) % lightboxTriggers.length;
      const trigger = lightboxTriggers[currentIndex];
      const img = trigger.querySelector('img');
      imgEl.src = trigger.dataset.lightboxSrc || '';
      imgEl.alt = img ? img.alt : (trigger.dataset.lightboxTitle || '');
      tagEl.textContent = trigger.dataset.lightboxTag || '';
      titleEl.textContent = trigger.dataset.lightboxTitle || '';
      descEl.textContent = trigger.dataset.lightboxDesc || '';
    };

    const openLightbox = (index) => {
      renderLightbox(index);
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      document.body.style.overflow = '';
    };

    lightboxTriggers.forEach((trigger, index) => {
      trigger.addEventListener('click', () => openLightbox(index));
    });

    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', () => renderLightbox(currentIndex - 1));
    nextBtn?.addEventListener('click', () => renderLightbox(currentIndex + 1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('hidden')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') renderLightbox(currentIndex - 1);
      if (e.key === 'ArrowRight') renderLightbox(currentIndex + 1);
    });
  }
});
