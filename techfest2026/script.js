/* ═══════════════════════════════════════════════════════
   TECHFEST 2026 — script.js
   Three.js · GSAP · ScrollTrigger · Custom Interactions
═══════════════════════════════════════════════════════ */

'use strict';

/* ── GSAP PLUGIN REGISTRATION ───────────────────────── */
gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════
   1. PRELOADER
══════════════════════════════════════════════════════ */
(function initPreloader() {
  const preloader  = document.getElementById('preloader');
  const bar        = document.getElementById('preBar');
  const barGlow    = document.getElementById('preBarGlow');
  const percent    = document.getElementById('prePercent');
  const status     = document.getElementById('preStatus');
  const bootLines  = document.getElementById('bootLines');
  const preCanvas  = document.getElementById('preCanvas');

  /* — mini particle canvas on preloader — */
  if (preCanvas) {
    const ctx = preCanvas.getContext('2d');
    preCanvas.width  = window.innerWidth;
    preCanvas.height = window.innerHeight;
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * preCanvas.width,
      y: Math.random() * preCanvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      a: Math.random()
    }));
    let raf;
    const drawPre = () => {
      ctx.clearRect(0, 0, preCanvas.width, preCanvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = preCanvas.width;
        if (p.x > preCanvas.width) p.x = 0;
        if (p.y < 0) p.y = preCanvas.height;
        if (p.y > preCanvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,255,${p.a * 0.4})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(drawPre);
    };
    drawPre();
    window.addEventListener('resize', () => {
      preCanvas.width  = window.innerWidth;
      preCanvas.height = window.innerHeight;
    });
    window._preloaderRaf = raf;
  }

  const bootMessages = [
    '> INITIALIZING NEURAL INTERFACE...',
    '> LOADING AI SUBSYSTEMS [████░░] 67%',
    '> CALIBRATING HOLOGRAPHIC ARRAYS...',
    '> CONNECTING TO TECHFEST NETWORK...',
    '> QUANTUM ENCRYPTION ACTIVE ✓',
    '> WELCOME TO TECHFEST 2026'
  ];
  const statusMessages = [
    'INITIALIZING SYSTEMS...',
    'LOADING NEURAL NETWORKS...',
    'CALIBRATING SENSORS...',
    'ESTABLISHING CONNECTIONS...',
    'ALMOST READY...',
    'LAUNCHING EXPERIENCE...'
  ];

  let current = 0;
  let progress = 0;
  const totalDuration = 3200;
  const startTime = Date.now();

  const addBootLine = (msg) => {
    const line = document.createElement('div');
    line.textContent = msg;
    line.style.opacity = '0';
    line.style.transition = 'opacity 0.3s';
    bootLines.appendChild(line);
    requestAnimationFrame(() => { line.style.opacity = '1'; });
    // Keep only last 4 lines
    while (bootLines.children.length > 4) {
      bootLines.removeChild(bootLines.firstChild);
    }
  };

  const tick = () => {
    const elapsed = Date.now() - startTime;
    progress = Math.min(elapsed / totalDuration, 1);
    const pct = Math.floor(progress * 100);

    bar.style.width = pct + '%';
    barGlow.style.opacity = pct > 0 ? '1' : '0';
    barGlow.style.left = pct + '%';
    percent.textContent = pct + '%';

    const msgIdx = Math.floor(progress * statusMessages.length);
    if (msgIdx !== current && msgIdx < statusMessages.length) {
      current = msgIdx;
      status.textContent = statusMessages[msgIdx];
      if (bootMessages[msgIdx]) addBootLine(bootMessages[msgIdx]);
    }

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      addBootLine(bootMessages[5]);
      status.textContent = 'LAUNCHING EXPERIENCE...';
      setTimeout(() => {
        preloader.classList.add('done');
        if (window._preloaderRaf) cancelAnimationFrame(window._preloaderRaf);
        setTimeout(() => {
          preloader.style.display = 'none';
          initCounters();
        }, 800);
      }, 400);
    }
  };

  requestAnimationFrame(tick);
})();

/* ══════════════════════════════════════════════════════
   2. HERO THREE.JS SCENE
══════════════════════════════════════════════════════ */
(function initHeroScene() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 8);

  /* — Lighting — */
  const ambLight = new THREE.AmbientLight(0x001122, 0.8);
  scene.add(ambLight);

  const cyanLight = new THREE.PointLight(0x00ffff, 3, 20);
  cyanLight.position.set(5, 3, 5);
  scene.add(cyanLight);

  const purpLight = new THREE.PointLight(0xb400ff, 2, 20);
  purpLight.position.set(-5, -2, 3);
  scene.add(purpLight);

  const blueLight = new THREE.PointLight(0x0077ff, 1.5, 15);
  blueLight.position.set(0, -5, 2);
  scene.add(blueLight);

  /* — Cyborg Head (stylized geometric) — */
  const headGroup = new THREE.Group();
  scene.add(headGroup);

  // Head main: truncated icosahedron-like
  const headGeo  = new THREE.IcosahedronGeometry(1.5, 1);
  const headMat  = new THREE.MeshPhongMaterial({
    color: 0x001a2e,
    emissive: 0x001122,
    specular: 0x00ffff,
    shininess: 80,
    wireframe: false,
  });
  const headMesh = new THREE.Mesh(headGeo, headMat);
  headGroup.add(headMesh);

  // Wireframe overlay
  const wireMat  = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true, transparent: true, opacity: 0.12 });
  const wireMesh = new THREE.Mesh(headGeo, wireMat);
  wireMesh.scale.setScalar(1.02);
  headGroup.add(wireMesh);

  // Eyes — glowing
  const eyeGeo = new THREE.SphereGeometry(0.22, 12, 12);
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
  const eyeGlowMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.15 });

  const leftEye  = new THREE.Mesh(eyeGeo, eyeMat);
  const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
  leftEye.position.set(-0.5, 0.2, 1.3);
  rightEye.position.set(0.5, 0.2, 1.3);
  headGroup.add(leftEye, rightEye);

  const eyeGlowGeo = new THREE.SphereGeometry(0.38, 12, 12);
  const lg = new THREE.Mesh(eyeGlowGeo, eyeGlowMat);
  const rg = new THREE.Mesh(eyeGlowGeo, eyeGlowMat);
  lg.position.copy(leftEye.position);
  rg.position.copy(rightEye.position);
  headGroup.add(lg, rg);

  // Circuit-like rings around head
  const ringParams = [
    { r: 2.2, tube: 0.018, color: 0x00ffff, tilt: Math.PI * 0.15, speed: 0.4 },
    { r: 2.6, tube: 0.014, color: 0xb400ff, tilt: Math.PI * 0.55, speed: -0.3 },
    { r: 3.0, tube: 0.010, color: 0x0077ff, tilt: Math.PI * 0.8,  speed: 0.2 },
  ];
  const rings = ringParams.map(({ r, tube, color, tilt, speed }) => {
    const geo  = new THREE.TorusGeometry(r, tube, 8, 100);
    const mat  = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = tilt;
    mesh.userData.speed = speed;
    headGroup.add(mesh);
    return mesh;
  });

  // Floating particles around head
  const particleCount = 200;
  const posArr = new Float32Array(particleCount * 3);
  const colArr = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const rad   = 2.5 + Math.random() * 3;
    posArr[i*3]   = rad * Math.sin(phi) * Math.cos(theta);
    posArr[i*3+1] = rad * Math.sin(phi) * Math.sin(theta);
    posArr[i*3+2] = rad * Math.cos(phi);
    const t = Math.random();
    colArr[i*3]   = t < 0.5 ? 0 : t < 0.8 ? 0.44 : 0;
    colArr[i*3+1] = t < 0.5 ? 1 : t < 0.8 ? 0.67 : 0.53;
    colArr[i*3+2] = t < 0.5 ? 1 : t < 0.8 ? 1    : 1;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
  pGeo.setAttribute('color',    new THREE.BufferAttribute(colArr, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.7 });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  /* — Neural Network Lines — */
  const neuralGroup = new THREE.Group();
  scene.add(neuralGroup);
  const nodes = [];
  for (let i = 0; i < 24; i++) {
    const x = (Math.random() - 0.5) * 12;
    const y = (Math.random() - 0.5) * 8;
    const z = -4 + Math.random() * -4;
    nodes.push(new THREE.Vector3(x, y, z));
  }
  const lineMat = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.08 });
  nodes.forEach((n, i) => {
    nodes.forEach((m, j) => {
      if (j <= i) return;
      if (n.distanceTo(m) < 5) {
        const geo = new THREE.BufferGeometry().setFromPoints([n, m]);
        neuralGroup.add(new THREE.Line(geo, lineMat));
      }
    });
  });

  /* — Mouse interaction — */
  const mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* — Scroll-driven camera — */
  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  /* — Resize — */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* — Animation loop — */
  let t = 0;
  const animate = () => {
    requestAnimationFrame(animate);
    t += 0.01;

    // Mouse-driven head rotation
    headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, mouse.x * 0.4, 0.05);
    headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, -mouse.y * 0.25, 0.05);

    // Breathing
    const breathe = 1 + Math.sin(t * 0.8) * 0.015;
    headMesh.scale.setScalar(breathe);
    wireMesh.scale.setScalar(breathe * 1.02);

    // Eye glow pulsing
    const eyePulse = 0.5 + Math.sin(t * 2) * 0.5;
    eyeMat.color.setRGB(0, eyePulse, eyePulse);

    // Ring rotation
    rings.forEach(r => { r.rotation.z += r.userData.speed * 0.01; });

    // Particle drift
    particles.rotation.y += 0.001;
    pMat.opacity = 0.5 + Math.sin(t * 0.5) * 0.2;

    // Light animation
    cyanLight.position.x = Math.sin(t * 0.7) * 5;
    cyanLight.position.y = Math.cos(t * 0.5) * 3;
    purpLight.position.x = Math.cos(t * 0.6) * 5;
    purpLight.position.z = Math.sin(t * 0.4) * 4;

    // Neural group subtle rotation
    neuralGroup.rotation.y += 0.0005;

    // Camera scroll reaction
    camera.position.y = -scrollY * 0.003;
    camera.position.z = 8 - scrollY * 0.004;

    renderer.render(scene, camera);
  };
  animate();
})();

/* ══════════════════════════════════════════════════════
   3. ABOUT CANVAS (Neural Network Background)
══════════════════════════════════════════════════════ */
(function initAboutCanvas() {
  const canvas = document.getElementById('aboutCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const setSize = () => {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  setSize();
  window.addEventListener('resize', setSize);

  const nodes = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
  }));

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,255,255,0.4)';
      ctx.fill();
    });
    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (j <= i) return;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,255,255,${(1 - d / 120) * 0.08})`;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(draw);
  };
  draw();
})();

/* ══════════════════════════════════════════════════════
   4. DOMES CANVAS (Particle Grid)
══════════════════════════════════════════════════════ */
(function initDomesCanvas() {
  const canvas = document.getElementById('domesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const setSize = () => {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  setSize();
  window.addEventListener('resize', setSize);

  let t = 0;
  const draw = () => {
    t += 0.01;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid dots
    const spacing = 50;
    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        const wave = Math.sin(x * 0.02 + t) * Math.cos(y * 0.02 + t);
        const a    = (wave + 1) / 2 * 0.2;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,0,255,${a})`;
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  };
  draw();
})();

/* ══════════════════════════════════════════════════════
   5. REGISTRATION CANVAS (Energy Rings)
══════════════════════════════════════════════════════ */
(function initRegCanvas() {
  const canvas = document.getElementById('regCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const setSize = () => {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  setSize();
  window.addEventListener('resize', setSize);

  let t = 0;
  const draw = () => {
    t += 0.008;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    [150, 220, 300, 390, 490].forEach((r, i) => {
      const offset = t + i * 0.8;
      const a = Math.abs(Math.sin(offset)) * 0.12;
      ctx.beginPath();
      ctx.arc(cx, cy, r + Math.sin(offset) * 10, 0, Math.PI * 2);
      ctx.strokeStyle = i % 2 === 0 ? `rgba(0,255,255,${a})` : `rgba(180,0,255,${a})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    requestAnimationFrame(draw);
  };
  draw();
})();

/* ══════════════════════════════════════════════════════
   6. NAVBAR SCROLL BEHAVIOR
══════════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
})();

/* ══════════════════════════════════════════════════════
   7. HAMBURGER MENU
══════════════════════════════════════════════════════ */
(function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
  });

  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ══════════════════════════════════════════════════════
   8. CUSTOM CURSOR
══════════════════════════════════════════════════════ */
(function initCursor() {
  const outer = document.getElementById('cursorOuter');
  const dot   = document.getElementById('cursorDot');
  if (!outer || !dot) return;

  let mx = -100, my = -100;
  let ox = -100, oy = -100;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  const lerp = (a, b, t) => a + (b - a) * t;
  const followOuter = () => {
    ox = lerp(ox, mx, 0.12);
    oy = lerp(oy, my, 0.12);
    outer.style.left = ox + 'px';
    outer.style.top  = oy + 'px';
    requestAnimationFrame(followOuter);
  };
  followOuter();

  const hoverEls = document.querySelectorAll('a, button, [data-magnetic]');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => outer.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => outer.classList.remove('is-hover'));
  });
})();

/* ══════════════════════════════════════════════════════
   9. MAGNETIC BUTTONS
══════════════════════════════════════════════════════ */
(function initMagnetic() {
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
})();

/* ══════════════════════════════════════════════════════
   10. SCROLL REVEAL
══════════════════════════════════════════════════════ */
(function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for siblings
        const siblings = [...entry.target.parentElement.querySelectorAll('[data-reveal]')];
        const idx      = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 80) + 'ms';
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => observer.observe(el));
})();

/* ══════════════════════════════════════════════════════
   11. COUNTER ANIMATION (Hero Stats)
══════════════════════════════════════════════════════ */
function initCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    let current  = 0;
    const step   = Math.max(1, Math.ceil(target / 60));
    const timer  = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

/* ══════════════════════════════════════════════════════
   12. TIMELINE SCROLL PROGRESS
══════════════════════════════════════════════════════ */
(function initTimelineProgress() {
  const progress = document.getElementById('timelineProgress');
  if (!progress) return;

  const section = document.getElementById('timeline');
  if (!section) return;

  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onUpdate: (self) => {
      progress.style.height = (self.progress * 100) + '%';
    }
  });
})();

/* ══════════════════════════════════════════════════════
   13. FAQ ACCORDION
══════════════════════════════════════════════════════ */
(function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ══════════════════════════════════════════════════════
   14. GALLERY CAROUSEL
══════════════════════════════════════════════════════ */
(function initGallery() {
  const track   = document.getElementById('galleryTrack');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  const dotsEl  = document.getElementById('galleryDots');
  if (!track) return;

  const items     = track.querySelectorAll('.gallery-item');
  const itemW     = 316; // 300 + 16 gap
  const visible   = Math.floor(window.innerWidth / itemW) || 1;
  const maxIndex  = Math.max(0, items.length - visible);
  let currentIdx  = 0;

  // Build dots
  items.forEach((_, i) => {
    if (i > maxIndex) return;
    const dot = document.createElement('button');
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  const dots = dotsEl.querySelectorAll('.gallery-dot');

  const goTo = (idx) => {
    currentIdx = Math.max(0, Math.min(idx, maxIndex));
    track.style.transform = `translateX(-${currentIdx * itemW}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
  };

  prevBtn.addEventListener('click', () => goTo(currentIdx - 1));
  nextBtn.addEventListener('click', () => goTo(currentIdx + 1));

  // Auto-scroll
  let autoTimer = setInterval(() => goTo(currentIdx >= maxIndex ? 0 : currentIdx + 1), 3500);
  track.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.addEventListener('mouseleave', () => {
    autoTimer = setInterval(() => goTo(currentIdx >= maxIndex ? 0 : currentIdx + 1), 3500);
  });

  // Touch support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? currentIdx + 1 : currentIdx - 1);
  });
})();

/* ══════════════════════════════════════════════════════
   15. GSAP SCROLL ANIMATIONS
══════════════════════════════════════════════════════ */
(function initGSAPAnimations() {
  /* — Section titles fade in — */
  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  /* — Event highlight cards stagger — */
  gsap.utils.toArray('.holo-card-event').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 50, rotateX: 10 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.8, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  /* — Speakers stagger — */
  gsap.utils.toArray('.speaker-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  /* — Dome cards stagger — */
  gsap.utils.toArray('.dome-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1, scale: 1,
        duration: 0.7, delay: i * 0.08, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  /* — Timeline items — */
  gsap.utils.toArray('.tl-item').forEach((item, i) => {
    const fromLeft = item.classList.contains('left');
    gsap.fromTo(item,
      { opacity: 0, x: fromLeft ? -60 : 60 },
      {
        opacity: 1, x: 0,
        duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  /* — About section parallax — */
  gsap.to('.about-holo-card', {
    y: -40,
    ease: 'none',
    scrollTrigger: {
      trigger: '.section-about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });

  /* — Hero content parallax on scroll — */
  gsap.to('.hero-content', {
    y: 120,
    opacity: 0.3,
    ease: 'none',
    scrollTrigger: {
      trigger: '.section-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  /* — Registration cards — */
  gsap.utils.toArray('.reg-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 0.8, delay: i * 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });
})();

/* ══════════════════════════════════════════════════════
   16. HOLOGRAPHIC CARD TILT EFFECT
══════════════════════════════════════════════════════ */
(function initTiltEffect() {
  const cards = document.querySelectorAll('.holo-card-event, .speaker-card, .dome-card, .reg-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ══════════════════════════════════════════════════════
   17. SMOOTH SCROLL FOR NAV LINKS
══════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ══════════════════════════════════════════════════════
   18. SECTION BACKGROUND GLOW ON SCROLL
══════════════════════════════════════════════════════ */
(function initScrollGlow() {
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.body.style.setProperty('--scroll-section', entry.target.id || 'none');
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => observer.observe(s));
})();

/* ══════════════════════════════════════════════════════
   19. DOME CARD COLOR SYNC
══════════════════════════════════════════════════════ */
(function initDomeColors() {
  document.querySelectorAll('.dome-card').forEach(card => {
    const color = card.getAttribute('data-color') || '#00ffff';
    const orbit1 = card.querySelector('.dome-orbit.o1');
    const orbit2 = card.querySelector('.dome-orbit.o2');
    if (orbit1) orbit1.style.borderColor = color + '33';
    if (orbit2) orbit2.style.borderColor = color + '22';
    card.addEventListener('mouseenter', () => {
      card.style.setProperty('--dome-color', color + '10');
    });
  });
})();

/* ══════════════════════════════════════════════════════
   20. PERFORMANCE: IntersectionObserver for Canvas Pause
══════════════════════════════════════════════════════ */
(function initCanvasPause() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      window._heroVisible = e.isIntersecting;
    });
  }, { threshold: 0 });
  obs.observe(hero);
  window._heroVisible = true;
})();

/* ══════════════════════════════════════════════════════
   21. FOOTER GRID ANIMATION
══════════════════════════════════════════════════════ */
(function initFooterGlow() {
  const footer = document.querySelector('.site-footer');
  if (!footer) return;

  ScrollTrigger.create({
    trigger: footer,
    start: 'top bottom',
    onEnter: () => {
      gsap.fromTo('.footer-inner > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }
  });
})();

/* ══════════════════════════════════════════════════════
   22. TYPING EFFECT FOR HERO SUBTITLE
══════════════════════════════════════════════════════ */
(function initTypingEffect() {
  const subtitle = document.querySelector('.hero-subtitle');
  if (!subtitle) return;

  const text = subtitle.textContent;
  subtitle.textContent = '';
  subtitle.style.opacity = '1';
  subtitle.style.borderRight = '2px solid rgba(0,255,255,0.6)';

  let i = 0;
  const delay = 2800; // Start after preloader
  setTimeout(() => {
    const type = () => {
      if (i < text.length) {
        subtitle.textContent += text[i++];
        setTimeout(type, 40 + Math.random() * 30);
      } else {
        // Remove cursor blink after done
        setTimeout(() => { subtitle.style.borderRight = 'none'; }, 1500);
      }
    };
    type();
  }, delay);
})();

/* ══════════════════════════════════════════════════════
   23. SCAN LINE MOUSE EFFECT ON HERO
══════════════════════════════════════════════════════ */
(function initScanEffect() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const scanLine = document.createElement('div');
  scanLine.style.cssText = `
    position:absolute;left:0;right:0;height:1px;
    background:linear-gradient(90deg,transparent,rgba(0,255,255,0.4),transparent);
    pointer-events:none;z-index:4;transition:top 0.05s linear;
    box-shadow:0 0 8px rgba(0,255,255,0.6);
  `;
  hero.appendChild(scanLine);

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    scanLine.style.top = (e.clientY - rect.top) + 'px';
    scanLine.style.opacity = '1';
  });
  hero.addEventListener('mouseleave', () => {
    scanLine.style.opacity = '0';
  });
})();

/* ══════════════════════════════════════════════════════
   LOG
══════════════════════════════════════════════════════ */
console.log(
  '%cTECHFEST 2026\n%cWhere Humans, AI & Innovation Converge\nhttps://techfest2026.io',
  'color:#00ffff;font-family:monospace;font-size:20px;font-weight:bold;',
  'color:#b400ff;font-family:monospace;font-size:12px;'
);
