(function () {
  'use strict';

  /* ---- sticky header state ---- */
  var head = document.querySelector('.site-head');
  function onScroll() {
    if (head) head.classList.toggle('scrolled', window.scrollY > 6);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- entrance motion for content below the first screen ---- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  var selector = '.sec-head, .strip, .project, .cap, .about-head, .about-copy, .contact-card';
  var fold = window.innerHeight * 0.88;

  var items = [];
  Array.prototype.forEach.call(document.querySelectorAll(selector), function (el) {
    var box = el.getBoundingClientRect();
    if (box.top < fold) return; /* already on screen: no animation, no flash */
    el.classList.add('reveal');
    items.push(el);
  });

  if (!items.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var siblings = el.parentElement ? el.parentElement.children : [];
      var index = Array.prototype.indexOf.call(siblings, el);
      el.style.transitionDelay = Math.min(index, 4) * 55 + 'ms';
      el.classList.add('in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

  items.forEach(function (el) { io.observe(el); });
})();
