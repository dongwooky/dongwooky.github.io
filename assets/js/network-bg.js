/* Hero background: a slow-drifting node graph (nod to multi-agent / GNN work).
   Static single frame when the user prefers reduced motion. */
(function () {
  const canvas = document.getElementById('hero-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w = 0, h = 0, dpr = 1, nodes = [], raf = null;
  const mouse = { x: -1e4, y: -1e4 };

  function accent() {
    return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#5b9dff';
  }
  function rgba(hex, a) {
    const n = parseInt(hex.replace('#', ''), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }

  function resize() {
    const r = canvas.parentElement.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(80, Math.max(28, Math.round((w * h) / 16000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: 1.2 + Math.random() * 1.8,
    }));
    draw();
  }

  function draw() {
    const col = accent();
    ctx.clearRect(0, 0, w, h);
    const link = 140;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < link * link) {
          const t = 1 - Math.sqrt(d2) / link;
          ctx.strokeStyle = rgba(col, 0.22 * t);
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      ctx.fillStyle = rgba(col, 0.55);
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    }
  }

  function step() {
    for (const n of nodes) {
      // gentle pull toward the pointer
      const dx = mouse.x - n.x, dy = mouse.y - n.y, d2 = dx * dx + dy * dy;
      if (d2 < 220 * 220) { n.vx += dx * 0.00002; n.vy += dy * 0.00002; }
      n.x += n.vx; n.y += n.vy;
      n.vx *= 0.995; n.vy *= 0.995;
      if (n.x < -10) n.x = w + 10; else if (n.x > w + 10) n.x = -10;
      if (n.y < -10) n.y = h + 10; else if (n.y > h + 10) n.y = -10;
    }
    draw();
    raf = requestAnimationFrame(step);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  if (!reduce) {
    canvas.parentElement.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    }, { passive: true });
    canvas.parentElement.addEventListener('pointerleave', () => { mouse.x = mouse.y = -1e4; });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = null; }
      else if (!raf) raf = requestAnimationFrame(step);
    });
    raf = requestAnimationFrame(step);
  }
  // redraw with the new accent when the theme flips
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
