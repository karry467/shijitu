// Global keyboard shortcuts (v1)
(function() {
  'use strict';

  // Ensure showToast exists
  function ensureToast() {
    if (typeof showToast === 'function') return;
    // Create toast container if not exists
    var container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:8px;pointer-events:none;';
      document.body.appendChild(container);
    }
    window.showToast = function(msg) {
      var el = document.createElement('div');
      el.style.cssText = 'padding:10px 20px;border-radius:8px;font-size:14px;color:#fff;background:rgba(44,36,22,0.85);backdrop-filter:blur(4px);box-shadow:0 4px 12px rgba(0,0,0,0.2);opacity:0;transform:translateX(20px);transition:all 0.3s ease;pointer-events:auto;';
      el.textContent = msg;
      container.appendChild(el);
      requestAnimationFrame(function() {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      });
      setTimeout(function() {
        el.style.opacity = '0';
        el.style.transform = 'translateX(20px)';
        setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
      }, 2000);
    };
  }

  // Ensure toggleTheme is accessible
  function toggleThemeShortcut() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    var next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch(e) {}
    // Update theme toggle icons
    document.querySelectorAll('.theme-toggle-icon').forEach(function(icon) {
      icon.style.display = icon.dataset.theme === next ? 'block' : 'none';
    });
    showToast('已切换为' + (next === 'dark' ? '暗色' : '亮色') + '主题');
  }

  function focusSearch() {
    var search = document.getElementById('searchInput')
      || document.getElementById('idiomSearch')
      || document.getElementById('timelineSearch')
      || document.querySelector('input[type="text"]')
      || document.querySelector('input[type="search"]');
    if (search) {
      search.focus();
      search.select();
    }
  }

  document.addEventListener('keydown', function(e) {
    // Don't trigger when typing in input/select/textarea
    var tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

    // T - Toggle theme
    if (e.key === 't' || e.key === 'T') {
      e.preventDefault();
      ensureToast();
      toggleThemeShortcut();
      return;
    }

    // / - Focus search
    if (e.key === '/') {
      e.preventDefault();
      focusSearch();
      return;
    }
  });
})();
