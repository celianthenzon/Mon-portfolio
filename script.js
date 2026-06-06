

document.addEventListener('DOMContentLoaded', () => {

  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

 
  function animateRing() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

 
  const hoverTargets = document.querySelectorAll(
    'a, button, .tag, .project-card, input, textarea'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorRing.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorRing.classList.remove('hover');
    });
  });

  
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  let W, H;
  const PARTICLE_COUNT = 75;
  const MAX_DIST       = 130;

  function resizeCanvas() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

 
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x:  Math.random() * window.innerWidth,
    y:  Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r:  Math.random() * 1.6 + 0.4,
    o:  Math.random() * 0.5 + 0.1,
  }));

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
     
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

     
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 238, 255, ${p.o})`;
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0, 238, 255, ${(1 - d / MAX_DIST) * 0.07})`;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  
  const roles = [
    'Développeuse Web 🌐',
    'Conceptrice UX/UI 🎨',
    'Étudiante passionnée 📚',
    'Pythoniste en herbe 🐍',
    'Future App Designer 🚀',
  ];

  let roleIndex   = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  const typedEl   = document.getElementById('typed');

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedEl.textContent = currentRole.slice(0, charIndex--);
    } else {
      typedEl.textContent = currentRole.slice(0, charIndex++);
    }

    let speed = isDeleting ? 45 : 85;

    if (!isDeleting && charIndex > currentRole.length) {
      speed = 1800; 
      isDeleting = true;
    }

    if (isDeleting && charIndex < 0) {
      isDeleting  = false;
      charIndex   = 0;
      roleIndex   = (roleIndex + 1) % roles.length;
      speed = 300;
    }

    setTimeout(typeEffect, speed);
  }
  typeEffect();

 
  const header    = document.getElementById('header');
  const scrollBtn = document.getElementById('scrollTop');
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.navbar a');

  window.addEventListener('scroll', () => {
    // Header fond
    header.classList.toggle('scrolled', window.scrollY > 50);

  
    scrollBtn.classList.toggle('visible', window.scrollY > 300);

    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) {
        a.classList.add('active');
      }
    });
  });

 
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  
  const hamburger = document.getElementById('hamburger');
  const navbar    = document.querySelector('.navbar');

  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('open');
  });

 
  navLinks.forEach(link => {
    link.addEventListener('click', () => navbar.classList.remove('open'));
  });

 
  const revealEls = document.querySelectorAll(
    '.section-title, .section-line, .about-text p, .stat-card, .project-card, .contact-item'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

 
  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.1) + 's';
  });

 
  const skillSection = document.querySelector('.about');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          fill.style.width = fill.dataset.width + '%';
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (skillSection) skillObserver.observe(skillSection);

  
  const statsSection = document.querySelector('.about-stats');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.num').forEach(num => {
          const target = parseInt(num.dataset.target, 10);
          let current  = 0;
          const step   = Math.max(1, Math.ceil(target / 40));

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            num.textContent = current;
          }, 45);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (statsSection) counterObserver.observe(statsSection);

  
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Merci de remplir tous les champs obligatoires.');
      return;
    }

  
    submitBtn.innerHTML  = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled   = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message envoyé !';
      submitBtn.classList.add('sent');
      form.reset();

      // Réinitialiser après 3,5s
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Envoyer le message';
        submitBtn.classList.remove('sent');
        submitBtn.disabled  = false;
      }, 3500);
    }, 1600);
  });

  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});