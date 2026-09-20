/**
 * Site-wide motion: scroll reveals, animated counters, scroll progress bar,
 * compact-on-scroll header and a gentle hero parallax.
 * Everything is skipped when the visitor prefers reduced motion.
 */
const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Lets the inline fallback in <head> know that this script has loaded.
(window as unknown as { __motionReady?: boolean }).__motionReady = true;

/* ---------- Scroll reveal ---------- */
if (reduced) {
  root.classList.add('no-motion');
} else {
  const revealer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        revealer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => revealer.observe(el));
}

/* ---------- Animated counters ---------- */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
  const to = Number(el.dataset.to);
  const from = Number(el.dataset.from ?? 0);
  const decimals = Number(el.dataset.decimals ?? 0);
  const suffix = el.dataset.suffix ?? '';
  if (reduced || Number.isNaN(to)) return; // markup already shows the final value

  const render = (value: number) => {
    el.textContent = value.toFixed(decimals) + suffix;
  };
  render(from);

  const counter = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting) return;
      counter.disconnect();
      const duration = 1800;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        render(from + (to - from) * easeOutCubic(t));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },
    { threshold: 0.6 },
  );
  counter.observe(el);
});

/* ---------- Scroll-linked effects ---------- */
const header = document.querySelector<HTMLElement>('[data-header]');
const progress = document.querySelector<HTMLElement>('[data-progress]');
const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));

let ticking = false;
const update = () => {
  ticking = false;
  const y = window.scrollY;
  header?.toggleAttribute('data-scrolled', y > 12);

  if (progress) {
    const max = root.scrollHeight - window.innerHeight;
    progress.style.setProperty('--p', String(max > 0 ? Math.min(y / max, 1) : 0));
  }
  if (!reduced && y < window.innerHeight * 1.5) {
    for (const el of parallax) {
      el.style.transform = `translate3d(0, ${(y * Number(el.dataset.parallax ?? 0.08)).toFixed(1)}px, 0)`;
    }
  }
};
window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  },
  { passive: true },
);
window.addEventListener('resize', update, { passive: true });
update();
