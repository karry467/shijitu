// v2 cache bust
(function() {
  function getTheme() {
    try { return localStorage.getItem('theme') || 'light'; } catch(e) { return 'light'; }
  }
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch(e) {}
    updateIcons();
    updateScrollbarTheme();
  }
  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
  }
  function updateScrollbarTheme() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var thumb = isDark ? '#4a453e' : '#C4B8A6';
    var thumbHover = isDark ? '#6a6560' : '#A89880';
    var style = document.getElementById('custom-scrollbar');
    if (!style) {
      style = document.createElement('style');
      style.id = 'custom-scrollbar';
      document.head.appendChild(style);
    }
    style.textContent =
      '::-webkit-scrollbar { width: 6px; height: 6px; }' +
      '::-webkit-scrollbar-track { background: transparent; }' +
      '::-webkit-scrollbar-thumb { background: ' + thumb + '; border-radius: 3px; }' +
      '::-webkit-scrollbar-thumb:hover { background: ' + thumbHover + '; }' +
      '* { scrollbar-width: thin; scrollbar-color: ' + thumb + ' transparent; }';
  }
  function updateIcons() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    document.querySelectorAll('.theme-toggle-icon').forEach(function(icon) {
      icon.style.display = icon.dataset.theme === current ? 'block' : 'none';
    });
  }
  var btn = document.getElementById('themeToggle');
  if (btn) btn.addEventListener('click', toggleTheme);
  updateIcons();
  updateScrollbarTheme();
})();
