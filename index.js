document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const id = link.getAttribute('href').slice(1);
      const next = document.getElementById(id);
      const prev = document.querySelector('section.is-active');

      if (!next || next === prev) return;

      const swap = () => {
        if (prev) {
          prev.hidden = true;
          prev.classList.remove('is-active');
        }
        next.hidden = false;
        next.classList.add('is-active');
      };
 
      if (document.startViewTransition) {
        document.startViewTransition(swap);
      } else {
        swap();
      }
    });
  });
});