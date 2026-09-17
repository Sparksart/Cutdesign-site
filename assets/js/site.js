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

  // Theme picker (light / dark, both options always visible). The initial
  // theme is already applied by an inline script in <head> (before first
  // paint) to avoid a flash of the wrong theme; this just wires up the two
  // buttons and keeps them in sync.
  const THEME_KEY = 'cutdesign-theme';
  const themeOptions = document.querySelectorAll('.theme-option');

  const storeTheme = (value) => {
    try { localStorage.setItem(THEME_KEY, value); } catch (e) {}
  };

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    themeOptions.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.themeChoice === theme));
    });
  };

  // Sync button state with whatever the inline head script already set.
  // Light is the default appearance; dark is the opt-in choice.
  applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  themeOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const choice = btn.dataset.themeChoice === 'dark' ? 'dark' : 'light';
      applyTheme(choice);
      storeTheme(choice);
    });
  });
});
