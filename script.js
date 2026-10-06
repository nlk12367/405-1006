const sectionLinks = [...document.querySelectorAll('nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const current = entries.find(entry => entry.isIntersecting);
    if (!current) return;
    sectionLinks.forEach(link => {
      const active = link.hash === '#' + current.target.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, {rootMargin: '-10% 0px -65% 0px'});
  document.querySelectorAll('.content-section').forEach(section => observer.observe(section));
}
window.addEventListener('beforeprint', () => {
  document.querySelectorAll('.notes').forEach(note => {
    note.dataset.prePrintOpen = String(note.open);
    note.open = true;
  });
});
window.addEventListener('afterprint', () => {
  document.querySelectorAll('.notes').forEach(note => {
    note.open = note.dataset.prePrintOpen === 'true';
  });
});
