// ==========================================
// SNN KNOWLEDGEWOOD – INTERACTIONS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // ----- Hero Slider -----
  const slides = document.querySelectorAll('.hero-slide');
  const slideDots = document.querySelectorAll('.slide-dot');
  let currentSlide = 0;
  let sliderInterval;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    slideDots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    slideDots[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }

  sliderInterval = setInterval(nextSlide, 5000);

  slideDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(sliderInterval);
      goToSlide(i);
      sliderInterval = setInterval(nextSlide, 5000);
    });
  });


  // ----- Navbar scroll effect -----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ----- Hamburger menu -----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '';
    spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });

  // ----- Active nav link on scroll -----
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-link');

  const observerOptions = {
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ----- AOS (Animate on Scroll) -----
  const aosElements = document.querySelectorAll('[data-aos]');

  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay;
        if (delay) {
          setTimeout(() => entry.target.classList.add('aos-animate'), parseInt(delay));
        } else {
          entry.target.classList.add('aos-animate');
        }
      }
    });
  }, { threshold: 0.12 });

  aosElements.forEach(el => aosObserver.observe(el));

  // ----- Animated Stats Counter -----
  const statNumbers = document.querySelectorAll('.stat-number');

  const countUp = (el, target, suffix) => {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 20);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(el => {
          const text = el.textContent;
          const num = parseInt(text.replace(/\D/g, ''));
          const suffix = text.replace(/[0-9]/g, '');
          countUp(el, num, suffix);
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) statsObserver.observe(statsBar);

  // ----- Testimonials dots -----
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  // ----- Smooth scroll offset for fixed navbar -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const offset = 80;
        const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ----- Gallery lightbox effect -----
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.9);
        display: flex; align-items: center; justify-content: center;
        z-index: 9999; cursor: pointer; animation: fadeIn 0.2s ease;
      `;
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt;
      imgEl.style.cssText = 'max-width: 90vw; max-height: 90vh; object-fit: contain; border-radius: 12px;';
      lightbox.appendChild(imgEl);
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';

      lightbox.addEventListener('click', () => {
        document.body.removeChild(lightbox);
        document.body.style.overflow = '';
      });
    });
  });

});

// Inject keyframe for lightbox
const style = document.createElement('style');
style.textContent = '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }';
document.head.appendChild(style);
