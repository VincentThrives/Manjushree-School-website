// Manjushree English School, Sira — shared interactions

const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('in'));
}

const counters = document.querySelectorAll('[data-count]');
if ('IntersectionObserver' in window && counters.length) {
  const co = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1400; const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const val = target * (1 - Math.pow(1 - p, 3));
        el.textContent = (Number.isInteger(target) ? Math.round(val) : val.toFixed(0)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      co.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => co.observe(el));
}

const y = document.querySelector('[data-year]');
if (y) y.textContent = new Date().getFullYear();

const form = document.querySelector('#enquiry-form');
if (form) {
  const note = document.querySelector('#form-status');
  const btn = form.querySelector('button[type="submit"]');
  const showNote = (msg, ok) => {
    if (!note) return;
    note.style.display = 'block';
    note.textContent = msg;
    note.style.color = ok ? 'var(--maroon)' : '#b00020';
  };
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const original = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    showNote('Sending your enquiry…', true);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNote('Thank you! Your enquiry has been sent. Our office will contact you soon.', true);
        form.reset();
      } else {
        showNote('Sorry, something went wrong. Please call or email us directly.', false);
      }
    } catch (err) {
      showNote('Network error. Please check your connection, or call/email us directly.', false);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = original; }
    }
  });
}
