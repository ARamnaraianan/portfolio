/* =========================================================
   PORTFOLIO SCRIPT
   ========================================================= */

/* ── Footer year ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ─────────────────────────────────────────────
   PARTICLES.JS CONFIG
───────────────────────────────────────────── */
particlesJS('particles-js', {
  particles: {
    number: { value: 70, density: { enable: true, value_area: 800 } },
    color: { value: ['#00e5ff', '#00ffa3', '#ffffff'] },
    shape: { type: 'circle' },
    opacity: { value: 0.4, random: true, anim: { enable: true, speed: 0.6, opacity_min: 0.05, sync: false } },
    size:    { value: 2.5, random: true, anim: { enable: false } },
    line_linked: {
      enable: true,
      distance: 140,
      color: '#00e5ff',
      opacity: 0.08,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.9,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    },
    modes: {
      grab: { distance: 160, line_linked: { opacity: 0.22 } },
      push: { particles_nb: 3 }
    }
  },
  retina_detect: true
});

/* ─────────────────────────────────────────────
   TYPING ANIMATION
───────────────────────────────────────────── */
const roles = [
  'Java Full Stack Developer',
  'Web Developer',
  'Spring Boot Engineer',
  'React Developer',
  'Problem Solver'
];

let roleIdx   = 0;
let charIdx   = 0;
let deleting  = false;
let typePause = false;
const typedEl = document.getElementById('typed-output');

function typeLoop() {
  const current = roles[roleIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 45);
  }
}

typeLoop();

/* ─────────────────────────────────────────────
   STICKY NAVBAR
───────────────────────────────────────────── */
const navbar = document.getElementById('navbar');

function onScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  highlightNav();
  revealElements();
  animateSkillBars();
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ─────────────────────────────────────────────
   HAMBURGER MENU
───────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ─────────────────────────────────────────────
   ACTIVE NAV HIGHLIGHT
───────────────────────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link');

function highlightNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');

function revealElements() {
  const vh = window.innerHeight;
  reveals.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh - 80) {
      // stagger sibling reveals
      const delay = el.closest('.skills-grid, .projects-grid') ? i * 60 : 0;
      setTimeout(() => el.classList.add('visible'), delay);
    }
  });
}

// Trigger once on load too
window.addEventListener('load', () => {
  revealElements();
  animateSkillBars();
});

/* ─────────────────────────────────────────────
   SKILL BARS
───────────────────────────────────────────── */
const skillBars    = document.querySelectorAll('.skill-bar');
let   barsAnimated = false;

function animateSkillBars() {
  if (barsAnimated) return;
  const section = document.getElementById('skills');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 60) {
    barsAnimated = true;
    skillBars.forEach((bar, i) => {
      const target = bar.dataset.width || '0';
      setTimeout(() => { bar.style.width = target + '%'; }, i * 120);
    });
  }
}

/* ─────────────────────────────────────────────
   SMOOTH SCROLL (polyfill-safe)
───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const btnText     = document.getElementById('btn-text');

contactForm.addEventListener('submit', async e => {
  e.preventDefault();

  // Button loading state
  btnText.textContent = 'Sending…';
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;

  // Simulate async send (replace with real API call)
  await new Promise(resolve => setTimeout(resolve, 1400));

  btnText.textContent = 'Send Message';
  submitBtn.disabled  = false;
  contactForm.reset();
  formSuccess.style.display = 'block';

  setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
});

/* ─────────────────────────────────────────────
   STAGGER DELAYS FOR GRID ITEMS
───────────────────────────────────────────── */
document.querySelectorAll('.skills-grid .skill-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 60}ms`;
});
document.querySelectorAll('.projects-grid .project-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});

/* ─────────────────────────────────────────────
   INITIAL CALL
───────────────────────────────────────────── */
onScroll();