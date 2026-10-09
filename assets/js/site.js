/* =========================================================
   Pallav Mishra Portfolio - site.js
   No dependencies. Each feature is self-contained and only
   runs when its markup is present on the page.
   1. Navigation (mobile menu, scrolled state)
   2. Footer year
   3. Selected work switcher
   4. Testimonial slider (4 / 2 / 1 per view)
   5. Image fallbacks
   6. Custom cursor
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Navigation ---------- */
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.menu-toggle');

  if (nav) {
    var setScrolled = function () { nav.classList.toggle('is-scrolled', window.scrollY > 12); };
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }

  if (nav && toggle) {
    var label = toggle.querySelector('span');
    var setMenu = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (label) label.textContent = open ? 'Close' : 'Menu';
    };
    toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) setMenu(false); });
  }

  /* Floating WhatsApp button: hidden while the hero CTAs are on screen */
  var wa = document.querySelector('.wa-float');
  var hero = document.querySelector('.hero');
  if (wa && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      wa.classList.toggle('is-hidden', entries[0].intersectionRatio > 0.35);
    }, { threshold: [0, 0.35, 0.6, 1] }).observe(hero);
  }

  /* ---------- 2. Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- 3. Selected work switcher ---------- */
  var projects = Array.prototype.slice.call(document.querySelectorAll('.project'));
  var visuals = Array.prototype.slice.call(document.querySelectorAll('.visual-card'));

  function activateProject(index) {
    projects.forEach(function (p, i) {
      p.classList.toggle('is-active', i === index);
      p.setAttribute('aria-pressed', String(i === index));
    });
    visuals.forEach(function (v, i) { v.classList.toggle('is-active', i === index); });
  }

  projects.forEach(function (project, i) {
    project.addEventListener('mouseenter', function () { if (window.innerWidth > 900) activateProject(i); });
    project.addEventListener('focus', function () { activateProject(i); });
    project.addEventListener('click', function () { activateProject(i); });
  });

  /* ---------- 4. Testimonial slider ----------
     Layout (cards per view) is controlled in CSS via --per-view:
     4 on desktop, 2 on tablet, 1 on phones. When every card fits,
     the controls hide themselves. */
  document.querySelectorAll('.testimonial-slider').forEach(function (slider) {
    var track = slider.querySelector('.testimonial-track');
    var cards = Array.prototype.slice.call(track.children);
    var dotsWrap = slider.querySelector('.slider-dots');
    var prev = slider.querySelector('.slider-prev');
    var next = slider.querySelector('.slider-next');
    var pages = 1;

    function perView() {
      var v = parseInt(getComputedStyle(slider).getPropertyValue('--per-view'), 10);
      return isNaN(v) ? 1 : v;
    }
    function currentPage() {
      var step = cards[0] ? cards[0].offsetWidth : 1;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return Math.round(track.scrollLeft / ((step + gap) * perView()));
    }
    function goTo(page) {
      var target = cards[Math.min(page * perView(), cards.length - 1)];
      if (target) track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    function update() {
      var page = currentPage();
      Array.prototype.forEach.call(dotsWrap.children, function (d, i) {
        d.setAttribute('aria-current', String(i === page));
      });
      if (prev) prev.disabled = page <= 0;
      if (next) next.disabled = page >= pages - 1;
    }
    function build() {
      pages = Math.ceil(cards.length / perView());
      slider.classList.toggle('is-scrollable', pages > 1);
      dotsWrap.innerHTML = '';
      for (var i = 0; i < pages; i++) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Show testimonials page ' + (i + 1));
        (function (n) { b.addEventListener('click', function () { goTo(n); }); })(i);
        dotsWrap.appendChild(b);
      }
      update();
    }

    if (prev) prev.addEventListener('click', function () { goTo(currentPage() - 1); });
    if (next) next.addEventListener('click', function () { goTo(currentPage() + 1); });

    var t;
    track.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(update, 60); }, { passive: true });
    var resizeTimer;
    window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(build, 150); });
    build();
  });

  /* ---------- 5. Image fallbacks ----------
     Live screenshots come from a third-party service. If it is
     slow or down, swap in the local branded placeholder. */
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    var swap = function () {
      if (img.dataset.fallbackDone) return;
      img.dataset.fallbackDone = '1';
      img.src = img.dataset.fallback;
    };
    img.addEventListener('error', swap);
    if (img.complete && img.naturalWidth === 0) swap();
  });

  /* ---------- 6. Custom cursor (desktop, fine pointer only) ---------- */
  var dot = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (dot && ring && finePointer && !reduceMotion) {
    document.documentElement.classList.add('has-cursor');
    var x = window.innerWidth / 2, y = window.innerHeight / 2, rx = x, ry = y;
    window.addEventListener('pointermove', function (e) {
      x = e.clientX; y = e.clientY;
      dot.style.left = x + 'px'; dot.style.top = y + 'px';
    });
    (function loop() {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, .project, .stack-item').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('is-hover'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('is-hover'); });
    });
  }
})();
