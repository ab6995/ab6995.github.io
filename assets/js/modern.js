/*
 * Portfolio interactivity script
 *
 * Adds scroll-based nav highlighting and fade-in animations for elements
 * with the `.reveal` class. You can extend this file to include more
 * interactive behaviours such as mobile nav toggles or theme switching.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Reveal animations using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => revealObserver.observe(el));

  // Navigation active link on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  function activateNavLink() {
    let currentSection = '';
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.35) {
        currentSection = section.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', activateNavLink);
  activateNavLink();
});
