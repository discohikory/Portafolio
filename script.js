// Portafolio - script.js (versión parchada)
// NOTA: index.html ya trae toda la lógica inline (terminal, juego, FAQ, Supabase).
// Este archivo queda solo como respaldo para el resaltado del nav y NO usa Firebase
// para evitar el error "Cannot use import outside a module" y el apiKey "TU_API_KEY".
(function () {
  try {
    var links = Array.prototype.slice.call(document.querySelectorAll('nav a'));
    var sections = links
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(function (s) { navObserver.observe(s); });
  } catch (e) {
    console.warn('nav fallback:', e);
  }
})();
