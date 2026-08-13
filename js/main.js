// loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('done'), 900);
});

// header scroll state
const header = document.getElementById('siteHeader');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// mobile menu
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');
menuBtn.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuBtn.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
mainNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuBtn.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

// before/after toggle: hover in/out on mouse, tap to toggle on touch
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
document.querySelectorAll('.work-card-ba').forEach(card => {
  if (supportsHover) {
    card.addEventListener('mouseenter', () => card.classList.add('is-after'));
    card.addEventListener('mouseleave', () => card.classList.remove('is-after'));
  } else {
    card.addEventListener('click', () => card.classList.toggle('is-after'));
  }
});

// contact form (Web3Forms submission)
const form = document.getElementById('contactForm');
if (form) {
  const note = document.getElementById('formNote');
  const success = document.getElementById('formSuccess');
  const submitBtn = form.querySelector('.submit-btn');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    note.textContent = '送信しています…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      const result = await res.json();
      if (result.success) {
        form.reset();
        form.hidden = true;
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        note.textContent = '送信に失敗しました。お手数ですが、お電話またはメールにて直接ご連絡ください。';
        submitBtn.disabled = false;
      }
    } catch (err) {
      note.textContent = '送信に失敗しました。お手数ですが、お電話またはメールにて直接ご連絡ください。';
      submitBtn.disabled = false;
    }
  });
}
