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

  // Theme toggle (light / dark). The initial theme is already applied by an
  // inline script in <head> (before first paint) to avoid a flash of the
  // wrong theme; this just wires up the button and keeps it in sync.
  const THEME_KEY = 'cutdesign-theme';
  const themeToggle = document.getElementById('themeToggle');

  const storeTheme = (value) => {
    try { localStorage.setItem(THEME_KEY, value); } catch (e) {}
  };

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    if (themeToggle) {
      const isLight = theme === 'light';
      themeToggle.setAttribute('aria-pressed', String(isLight));
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    }
  };

  // Sync button state with whatever the inline head script already set.
  applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      storeTheme(next);
    });
  }
});
