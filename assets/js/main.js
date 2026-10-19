/* dongwooky.github.io — renders every section from assets/data/cv.json
   in the active language (EN / KO), plus nav, theme, reveal and lightbox. */
(function () {
  'use strict';

  // ---------- i18n for static UI strings ----------
  const UI = {
    en: {
      'nav.about': 'About', 'nav.publications': 'Publications', 'nav.patents': 'Patents',
      'nav.experience': 'Experience', 'nav.education': 'Education', 'nav.awards': 'Awards', 'nav.contact': 'Contact',
      'hero.cv': 'Download CV', 'hero.email': 'Email me', 'hero.chip': 'Open to research roles · US / KR',
      'about.title': 'About & Research Focus', 'about.sub': 'Three threads that run through my work.',
      'pubs.title': 'Selected Publications', 'pubs.sub': 'Co-first-authored work with LG Electronics at EMNLP and ACL, and a first-authored journal article in DMKD.',
      'pubs.more': 'Show all publications', 'pubs.less': 'Show fewer',
      'patents.title': 'Patents', 'patents.sub': 'Two registered in Korea, two applications pending.',
      'exp.title': 'Experience', 'exp.sub': 'Industry and research positions.',
      'edu.title': 'Education', 'edu.sub': '',
      'awards.title': 'Honors & Awards', 'awards.sub': 'Click an award to see the certificate.',
      'awards.major': 'Major awards', 'awards.academic': 'Academic recognition',
      'contact.title': "Let's build something reliable.",
      'contact.sub': 'Open to AI research engineering roles and PhD opportunities in the US, and to collaborations on agentic systems and anomaly detection.',
      'footer.rights': 'Dongwook Kwon. Built with plain HTML, CSS and JS.', 'footer.updated': 'Last updated',
      'noimg': 'No certificate image',
    },
    ko: {
      'nav.about': '소개', 'nav.publications': '논문', 'nav.patents': '특허',
      'nav.experience': '경력', 'nav.education': '학력', 'nav.awards': '수상', 'nav.contact': '연락',
      'hero.cv': 'CV 다운로드', 'hero.email': '이메일 보내기', 'hero.chip': '연구직 · 박사과정 기회 환영',
      'about.title': '소개 & 연구 분야', 'about.sub': '제 연구를 관통하는 세 가지 축입니다.',
      'pubs.title': '대표 논문', 'pubs.sub': 'LG전자와 협업한 EMNLP·ACL 공동 제1저자 논문과 DMKD 제1저자 저널 논문.',
      'pubs.more': '전체 논문 보기', 'pubs.less': '접기',
      'patents.title': '특허', 'patents.sub': '국내 등록 2건, 출원 2건.',
      'exp.title': '경력', 'exp.sub': '산업계 및 연구 경력.',
      'edu.title': '학력', 'edu.sub': '',
      'awards.title': '수상 및 표창', 'awards.sub': '수상 항목을 클릭하면 상장을 볼 수 있습니다.',
      'awards.major': '주요 수상', 'awards.academic': '학술 수상',
      'contact.title': '신뢰할 수 있는 AI, 함께 만들어요.',
      'contact.sub': '미국 AI 연구직 및 박사과정 기회, 그리고 에이전트 시스템·이상 탐지 관련 협업 제안을 환영합니다.',
      'footer.rights': '권동욱. 순수 HTML, CSS, JS로 제작.', 'footer.updated': '최종 수정',
      'noimg': '상장 이미지 없음',
    },
  };

  const ICONS = {
    agents: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="6" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M7.3 7.2 10.6 16M16.7 7.2 13.4 16M7.5 6h9"/></svg>',
    graph: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l5-6 4 3 4-7 5 4"/><path d="M3 21h18"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  };
  const FLAGS = { US: '🇺🇸', KR: '🇰🇷', CA: '🇨🇦' };

  // ---------- language ----------
  const params = new URLSearchParams(location.search);
  let lang = params.get('lang');
  if (lang !== 'en' && lang !== 'ko') {
    try { lang = localStorage.getItem('lang'); } catch (_) { lang = null; }
  }
  if (lang !== 'en' && lang !== 'ko') {
    lang = (navigator.language || '').toLowerCase().startsWith('ko') ? 'ko' : 'en';
  }

  const t = (v) => (v && typeof v === 'object' && !Array.isArray(v)) ? (v[lang] ?? v.en ?? '') : (v ?? '');
  const ui = (k) => UI[lang][k] ?? UI.en[k] ?? k;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = ui(el.dataset.i18n); });
    document.querySelectorAll('.lang-toggle button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    const url = new URL(location.href);
    if (lang === 'ko') url.searchParams.set('lang', 'ko'); else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
  }

  // ---------- theme ----------
  function initTheme() {
    let stored = null;
    try { stored = localStorage.getItem('theme'); } catch (_) {}
    if (stored === 'light' || stored === 'dark') document.documentElement.dataset.theme = stored;
    document.getElementById('theme-btn').addEventListener('click', () => {
      const isLight = getComputedStyle(document.documentElement).colorScheme.includes('light');
      const next = isLight ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (_) {}
    });
  }

  // ---------- renderers ----------
  function renderHero(p) {
    document.getElementById('hero-role').textContent = t(p.role);
    document.getElementById('hero-name').innerHTML = `${esc(t(p.name))}<span class="alt">${esc(t(p.nameAlt))}</span>`;
    document.getElementById('hero-tagline').textContent = t(p.tagline);
    document.getElementById('hero-affil').textContent = t(p.affiliation);
    document.querySelectorAll('[data-link="cv"]').forEach((a) => (a.href = p.links.cv));
    document.querySelectorAll('[data-link="scholar"]').forEach((a) => (a.href = p.links.scholar));
    document.querySelectorAll('[data-link="github"]').forEach((a) => (a.href = p.links.github));
    document.querySelectorAll('[data-link="linkedin"]').forEach((a) => (a.href = p.links.linkedin));
    document.querySelectorAll('[data-link="email"]').forEach((a) => { a.href = `mailto:${p.email}`; if (a.classList.contains('email')) a.textContent = p.email; });
    document.getElementById('about-text').textContent = t(p.about);
    document.title = `${t(p.name)} — ${t(p.role)}`;
  }

  function renderStats(stats) {
    const el = document.getElementById('impact-grid');
    el.innerHTML = stats.map((s) => {
      const numeric = typeof s.value === 'number';
      return `<a class="stat" href="${esc(s.href || '#')}">
        <div class="v" ${numeric ? `data-count="${s.value}"` : ''}>${numeric ? '0' : esc(s.value)}${esc(s.suffix || '')}</div>
        <div class="l">${esc(t(s.label))}</div></a>`;
    }).join('');
    countUp(el);
  }

  function countUp(root) {
    const els = root.querySelectorAll('[data-count]');
    if (!els.length) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const run = (el) => {
      const target = +el.dataset.count;
      if (reduce) { el.textContent = target; return; }
      const start = performance.now(), dur = 900;
      const tick = (now) => {
        const k = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const done = new WeakSet();
    const start = (el) => { if (!done.has(el)) { done.add(el); run(el); } };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { start(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.2 });
    els.forEach((el) => io.observe(el));
    // safety net: never leave a stat at 0 (e.g. observer never fires)
    setTimeout(() => els.forEach(start), 2500);
  }

  function renderResearch(items) {
    document.getElementById('research-cards').innerHTML = items.map((r) => `
      <article class="card">
        <div class="card-icon">${ICONS[r.icon] || ''}</div>
        <h3>${esc(t(r.title))}</h3>
        <p>${esc(t(r.desc))}</p>
        <div class="tags">${(r.tags || []).map((x) => `<span class="tag">${esc(x)}</span>`).join('')}</div>
      </article>`).join('');
  }

  function pubHTML(p) {
    return `<article class="pub ${p.featured ? 'featured' : ''}">
      <span class="badge badge-${esc(p.badge)}">${esc(p.badge)}</span>
      <div>
        <h3>${esc(p.title)}</h3>
        <p class="authors">${p.authors}</p>
        <p class="venue"><span class="yr">${esc(p.year)}</span> · ${esc(t(p.venue))}</p>
        ${p.note ? `<p class="note">${esc(t(p.note))}</p>` : ''}
        ${p.summary ? `<p class="summary">${esc(t(p.summary))}</p>` : ''}
        ${p.links && p.links.length ? `<div class="links">${p.links.map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join('')}</div>` : ''}
      </div></article>`;
  }

  function renderPubs(pubs) {
    const featured = pubs.filter((p) => p.featured), rest = pubs.filter((p) => !p.featured);
    document.getElementById('pub-featured').innerHTML = featured.map(pubHTML).join('');
    const restEl = document.getElementById('pub-rest');
    restEl.innerHTML = rest.map(pubHTML).join('');
    const btn = document.getElementById('pub-toggle');
    btn.hidden = rest.length === 0;
    btn.onclick = () => {
      restEl.hidden = !restEl.hidden;
      btn.textContent = restEl.hidden ? `${ui('pubs.more')} (${rest.length})` : ui('pubs.less');
      btn.setAttribute('aria-expanded', String(!restEl.hidden));
    };
    btn.textContent = `${ui('pubs.more')} (${rest.length})`;
  }

  function renderPatents(items) {
    document.getElementById('patent-grid').innerHTML = items.map((p) => `
      <article class="patent">
        <div class="patent-top">
          <span class="status status-${esc(p.status)}">${p.status === 'registered' ? (lang === 'ko' ? '등록' : 'REGISTERED') : (lang === 'ko' ? '출원 중' : 'PENDING')}</span>
          <span class="date">${esc(t(p.date))}</span>
        </div>
        <h3>${esc(t(p.title))}</h3>
        <div class="num">${esc(p.number)}</div>
      </article>`).join('');
  }

  function renderExperience(items) {
    document.getElementById('timeline').innerHTML = items.map((e) => {
      let logo;
      if (e.logo && e.logo2) logo = `<div class="exp-logo dual"><img src="${esc(e.logo)}" alt=""><img src="${esc(e.logo2)}" alt=""></div>`;
      else if (e.logo) logo = `<div class="exp-logo"><img src="${esc(e.logo)}" alt=""></div>`;
      else logo = `<div class="exp-logo mono">${esc(e.monogram || '')}</div>`;
      return `<article class="exp ${e.current ? 'current' : ''}">
        <div class="period-col">${esc(t(e.period))}</div>
        <div>
          <div class="exp-head">${logo}<div>
            <h3>${esc(t(e.role))}</h3>
            <div class="org">${esc(t(e.org))}</div>
            <div class="meta"><span class="period">${esc(t(e.period))} · </span>${esc(t(e.location))}</div>
          </div></div>
          <ul>${(t(e.bullets) || []).map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
        </div></article>`;
    }).join('');
  }

  function renderEducation(items) {
    document.getElementById('edu-list').innerHTML = items.map((e) => `
      <article class="edu">
        <div class="edu-logo"><img src="${esc(e.logo)}" alt=""></div>
        <div><h3>${esc(t(e.degree))}</h3><div class="school">${esc(t(e.school))}</div></div>
        <div class="right"><b>${esc(t(e.detail))}</b>${esc(t(e.period))}</div>
      </article>`).join('');
  }

  function renderAwards(items) {
    const row = (a) => {
      const inner = `<div><h4>${esc(t(a.title))}</h4><div class="issuer">${esc(t(a.issuer))}</div></div>
        <div class="date">${esc(t(a.date))}<span class="flag">${FLAGS[a.country] || ''}</span></div>`;
      return a.image
        ? `<button class="award clickable" type="button" data-img="${esc(a.image)}" data-cap="${esc(t(a.title))} — ${esc(t(a.issuer))}">${inner}</button>`
        : `<div class="award">${inner}</div>`;
    };
    document.getElementById('awards-major').innerHTML = items.filter((a) => a.group === 'major').map(row).join('');
    document.getElementById('awards-academic').innerHTML = items.filter((a) => a.group === 'academic').map(row).join('');
  }

  // ---------- lightbox ----------
  function initLightbox() {
    const lb = document.getElementById('lightbox'), img = lb.querySelector('img'), cap = lb.querySelector('.cap');
    const close = () => { lb.classList.remove('open'); img.src = ''; document.body.style.overflow = ''; };
    document.addEventListener('click', (e) => {
      const b = e.target.closest('.award.clickable');
      if (!b) return;
      img.src = b.dataset.img; img.alt = b.dataset.cap; cap.textContent = b.dataset.cap;
      lb.classList.add('open'); document.body.style.overflow = 'hidden';
    });
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.closest('.close')) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });
  }

  // ---------- nav ----------
  function initNav() {
    const menu = document.getElementById('mobile-menu'), btn = document.getElementById('menu-btn');
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', (e) => { if (e.target.tagName === 'A') menu.classList.remove('open'); });

    const links = [...document.querySelectorAll('.nav-links a')];
    const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => io.observe(s));
  }

  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  }

  // The previous site registered a service worker; make sure old visitors get the new page.
  function unregisterOldSW() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister()));
    if (window.caches) caches.keys().then((ks) => ks.forEach((k) => caches.delete(k)));
  }

  // ---------- boot ----------
  let DATA = null;
  function renderAll() {
    applyLang();
    renderHero(DATA.profile);
    renderStats(DATA.stats);
    renderResearch(DATA.research);
    renderPubs(DATA.publications);
    renderPatents(DATA.patents);
    renderExperience(DATA.experience);
    renderEducation(DATA.education);
    renderAwards(DATA.awards);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNav();
    initLightbox();
    unregisterOldSW();
    document.getElementById('year').textContent = new Date().getFullYear();
    document.querySelectorAll('.lang-toggle button').forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.lang === lang) return;
      lang = b.dataset.lang;
      try { localStorage.setItem('lang', lang); } catch (_) {}
      if (DATA) renderAll(); else applyLang();
    }));
    applyLang();

    fetch('assets/data/cv.json', { cache: 'no-cache' })
      .then((r) => r.json())
      .then((d) => { DATA = d; renderAll(); initReveal(); })
      .catch((err) => { console.error('Failed to load cv.json', err); initReveal(); });
  });
})();
