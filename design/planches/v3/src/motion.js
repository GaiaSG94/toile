// Runtime motion (inlined in every page). Reveal-on-scroll only; reduced motion shows everything at once.
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = Array.prototype.slice.call(document.querySelectorAll('.rv'));
  function show(el) { el.classList.add('on'); }
  if (reduce || !('IntersectionObserver' in window)) { items.forEach(show); }
  else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }
  document.documentElement.setAttribute('data-ready', 'true');
})();
