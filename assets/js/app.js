/* =========================================================
   Ney Barão, Portfolio
   Theme + language toggles, and GSAP motion layer.
   All motion respects prefers-reduced-motion.
   ========================================================= */
(function () {
  "use strict";

  const html = document.documentElement;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---- Theme --------------------------------------------- */
  const THEME_KEY = "nb_theme";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  function applyTheme(t){ html.setAttribute("data-theme", t); try{localStorage.setItem(THEME_KEY,t);}catch(e){} }
  function initTheme(){ let t; try{t=localStorage.getItem(THEME_KEY);}catch(e){} if(!t) t=prefersDark.matches?"dark":"light"; applyTheme(t); }
  function toggleTheme(){ applyTheme(html.getAttribute("data-theme")==="dark"?"light":"dark"); }

  /* ---- Language ------------------------------------------ */
  const LANG_KEY = "nb_lang";
  function applyLang(l){
    html.setAttribute("data-lang", l);
    html.setAttribute("lang", l==="pt"?"pt-BR":"en");
    document.querySelectorAll("[data-lang-toggle]").forEach(b=>{ b.textContent = l==="pt"?"EN":"PT"; });
    try{localStorage.setItem(LANG_KEY,l);}catch(e){}
  }
  function initLang(){ let l; try{l=localStorage.getItem(LANG_KEY);}catch(e){} if(!l) l="en"; applyLang(l); }
  function toggleLang(){ applyLang(html.getAttribute("data-lang")==="pt"?"en":"pt"); }

  /* ---- Wire up toggles ----------------------------------- */
  initTheme();
  initLang();
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-theme-toggle]")) { toggleTheme(); return; }
    if (e.target.closest("[data-lang-toggle]")) { toggleLang(); return; }
  });

  /* ---- Motion (GSAP) ------------------------------------- */
  function hideLoader(instant){
    const loader = document.getElementById("loader");
    if (!loader) return;
    if (instant || !window.gsap) { loader.style.display = "none"; return; }
  }

  function initMotion(){
    const loader = document.getElementById("loader");
    if (prefersReduced.matches || !window.gsap) { if (loader) loader.style.display = "none"; return; }

    const gsap = window.gsap;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    // Loading curtain: reveal name, then lift the curtain.
    const tl = gsap.timeline();
    if (loader) {
      const nm = loader.querySelector(".loader__name");
      tl.to(nm, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.1)
        .to(loader, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "+=0.35")
        .set(loader, { display: "none" });
    }

    // Hero intro reveal, chained after the curtain.
    const heroBits = gsap.utils.toArray(".hero__name, .hero__intro, .case-hero__inner > *");
    if (heroBits.length) {
      tl.from(heroBits, { opacity: 0, y: 40, duration: 0.9, stagger: 0.08, ease: "power3.out" }, "-=0.2");
    }

    // Scroll-reveal for everything below the fold.
    const reveals = gsap.utils.toArray(
      ".section__head, .about__statement, .about__cols, .approach__card, .work-card, .exp-row, .clients__row, .footer__headline, .footer__email, .case-intro__lead, .case-meta, .case-split, .case-figure, .case-metrics"
    );
    reveals.forEach((el) => {
      gsap.from(el, {
        opacity: 0, y: 48, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });

    // Subtle parallax on full-bleed images.
    if (window.ScrollTrigger) {
      gsap.utils.toArray(".case-figure--bleed img").forEach((img) => {
        gsap.fromTo(img, { yPercent: -8 }, {
          yPercent: 8, ease: "none",
          scrollTrigger: { trigger: img.parentElement, scrub: true, start: "top bottom", end: "bottom top" }
        });
      });
    }

    // Magnetic hover.
    document.querySelectorAll("[data-magnetic], .nav__cta, .btn").forEach((el) => {
      const strength = parseFloat(el.getAttribute("data-magnetic")) || 0.3;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width/2) * strength, y: (e.clientY - r.top - r.height/2) * strength, duration: 0.4, ease: "power3.out" });
      });
      el.addEventListener("pointerleave", () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" }));
    });
  }

  if (document.readyState === "complete") initMotion();
  else window.addEventListener("load", initMotion);
})();
