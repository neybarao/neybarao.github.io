/* ==========================================================================
   Ney Barão — Portfolio JS
   - Theme & language toggle
   - Custom cursor
   - Page transition (curtain)
   - Scroll reveal
   - Parallax
   - Magnetic hover
   - Work list image preview
   - Live clock in São Paulo time
   ========================================================================== */

(() => {
  'use strict';

  const html = document.documentElement;
  const body = document.body;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const STORAGE = { theme: 'nb_theme', lang: 'nb_lang' };

  /* --------------- THEME ---------------- */
  const savedTheme = localStorage.getItem(STORAGE.theme);
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
  html.setAttribute('data-theme', initialTheme);

  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE.theme, next);
    updateThemeButton(next);
  }
  function updateThemeButton(theme) {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.innerHTML = theme === 'dark'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }
  updateThemeButton(initialTheme);

  /* --------------- LANGUAGE ------------- */
  const savedLang = localStorage.getItem(STORAGE.lang) || (navigator.language?.startsWith('pt') ? 'pt' : 'en');
  html.setAttribute('data-lang', savedLang);
  html.setAttribute('lang', savedLang === 'pt' ? 'pt-BR' : 'en');

  function toggleLang() {
    const current = html.getAttribute('data-lang');
    const next = current === 'pt' ? 'en' : 'pt';
    html.setAttribute('data-lang', next);
    html.setAttribute('lang', next === 'pt' ? 'pt-BR' : 'en');
    localStorage.setItem(STORAGE.lang, next);
    updateLangButton(next);
  }
  function updateLangButton(lang) {
    document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
      btn.textContent = lang === 'pt' ? 'EN' : 'PT';
      btn.setAttribute('aria-label', `Switch to ${lang === 'pt' ? 'English' : 'Portuguese'}`);
    });
  }
  updateLangButton(savedLang);

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-theme-toggle]');
    const l = e.target.closest('[data-lang-toggle]');
    if (t) { e.preventDefault(); toggleTheme(); }
    if (l) { e.preventDefault(); toggleLang(); }
  });

  /* --------------- CURSOR --------------- */
  if (hasFinePointer && !prefersReduced) {
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    body.classList.add('no-cursor');

    let mx = window.innerWidth/2, my = window.innerHeight/2;
    let dx = mx, dy = my, rx = mx, ry = my;

    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
    window.addEventListener('mouseleave', () => {
      dot.style.opacity = '0'; ring.style.opacity = '0';
    });
    window.addEventListener('mouseenter', () => {
      dot.style.opacity = ''; ring.style.opacity = '';
    });

    function raf() {
      dx += (mx - dx) * 0.9;
      dy += (my - dy) * 0.9;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate3d(${dx - 3}px, ${dy - 3}px, 0)`;
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Hover states
    const hoverables = 'a, button, [data-cursor="hover"], .work-item';
    document.addEventListener('mouseover', (e) => {
      const hov = e.target.closest(hoverables);
      if (hov) { dot.classList.add('is-hover'); ring.classList.add('is-hover'); }
      if (e.target.closest('[data-cursor="text"]')) { ring.classList.add('is-text'); }
    });
    document.addEventListener('mouseout', (e) => {
      const hov = e.target.closest(hoverables);
      if (hov) { dot.classList.remove('is-hover'); ring.classList.remove('is-hover'); }
      if (e.target.closest('[data-cursor="text"]')) { ring.classList.remove('is-text'); }
    });
  }

  /* --------------- PAGE TRANSITIONS ----- */
  let curtain = document.querySelector('.curtain');
  if (!curtain) {
    curtain = document.createElement('div');
    curtain.className = 'curtain';
    curtain.setAttribute('data-state', 'reveal');
    curtain.innerHTML = '<span class="curtain__word" aria-hidden="true">Ney Barão</span>';
    document.body.insertBefore(curtain, document.body.firstChild);
  }

  // After initial reveal finishes, park the curtain in "hide" (above screen)
  const initialDur = 1050;
  setTimeout(() => {
    if (curtain.getAttribute('data-state') === 'reveal') {
      curtain.setAttribute('data-state', 'hide');
    }
  }, initialDur);

  function isInternal(href) {
    try {
      const url = new URL(href, window.location.href);
      return url.origin === window.location.origin;
    } catch { return false; }
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return;
    if (!isInternal(a.href)) return;
    if (a.dataset.noTransition !== undefined) return;

    // Same-page hash navigation (e.g. /foo#bar from /foo)
    const target = new URL(a.href);
    if (target.pathname === window.location.pathname && target.hash) return;

    // Page transition: curtain rises from below to cover, then navigate
    e.preventDefault();
    curtain.setAttribute('data-state', 'hide');
    curtain.style.transform = 'translateY(100%)';
    // Force reflow so the next class change triggers the animation cleanly
    void curtain.offsetHeight;
    curtain.style.transform = '';
    curtain.setAttribute('data-state', 'cover');

    setTimeout(() => { window.location.href = a.href; }, 600);
  });

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      // Back from bfcache — ensure curtain is out of the way
      curtain.setAttribute('data-state', 'hide');
      curtain.style.transform = '';
    }
  });

  /* --------------- SCROLL REVEAL -------- */
  if ('IntersectionObserver' in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.02 });

    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
  }

  /* --------------- PARALLAX ------------- */
  if (!prefersReduced) {
    const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
    if (parallaxEls.length) {
      let ticking = false;
      function onScroll() {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      }
      function updateParallax() {
        const vh = window.innerHeight;
        parallaxEls.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > vh + 200) return;
          const speed = parseFloat(el.dataset.parallax) || 0.1;
          const center = rect.top + rect.height / 2 - vh / 2;
          const y = -center * speed;
          el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
        });
        ticking = false;
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', updateParallax);
      updateParallax();
    }
  }

  /* --------------- MAGNETIC HOVER ------- */
  if (hasFinePointer && !prefersReduced) {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      const strength = parseFloat(el.dataset.magnetic) || 0.28;
      let bx = 0, by = 0, tx = 0, ty = 0, raf;

      const loop = () => {
        bx += (tx - bx) * 0.18;
        by += (ty - by) * 0.18;
        el.style.transform = `translate3d(${bx.toFixed(2)}px, ${by.toFixed(2)}px, 0)`;
        if (Math.abs(tx - bx) > 0.05 || Math.abs(ty - by) > 0.05) {
          raf = requestAnimationFrame(loop);
        } else { raf = null; }
      };
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        tx = (e.clientX - (r.left + r.width/2)) * strength;
        ty = (e.clientY - (r.top + r.height/2)) * strength;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      el.addEventListener('mouseleave', () => {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });
    });
  }

  /* --------------- WORK LIST PREVIEW ---- */
  if (hasFinePointer && !prefersReduced) {
    const previews = new Map();
    document.querySelectorAll('.work-item').forEach(item => {
      const preview = item.querySelector('.work-item__preview');
      if (!preview) return;
      // Move the preview to <body> so it floats over everything
      document.body.appendChild(preview);
      previews.set(item, preview);

      let mx = 0, my = 0, cx = 0, cy = 0, raf;
      const loop = () => {
        cx += (mx - cx) * 0.18;
        cy += (my - cy) * 0.18;
        preview.style.left = cx + 'px';
        preview.style.top = cy + 'px';
        if (Math.abs(mx - cx) > 0.4 || Math.abs(my - cy) > 0.4) {
          raf = requestAnimationFrame(loop);
        } else { raf = null; }
      };

      item.addEventListener('mouseenter', () => {
        preview.classList.add('is-visible');
      });
      item.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      item.addEventListener('mouseleave', () => {
        preview.classList.remove('is-visible');
      });
    });
  }

  /* --------------- LIVE CLOCK ----------- */
  function updateClock() {
    const clock = document.querySelector('[data-clock]');
    if (!clock) return;
    try {
      const now = new Date();
      const opts = { timeZone: 'America/Campo_Grande', hour: '2-digit', minute: '2-digit', hour12: false };
      const t = now.toLocaleTimeString('pt-BR', opts);
      clock.textContent = `Campo Grande — ${t}`;
    } catch { /* noop */ }
  }
  updateClock();
  setInterval(updateClock, 15_000);

  /* --------------- YEAR ----------------- */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

})();
