document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('siteNav');
  const toggle = document.getElementById('navToggle');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
      const clickedInside = nav.contains(event.target) || toggle.contains(event.target);
      if (!clickedInside && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const currentPage = document.body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === currentPage) link.classList.add('active');
  });
});
