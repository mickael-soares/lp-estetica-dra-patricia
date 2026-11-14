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
});
