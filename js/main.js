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

// contact form (static demo submission)
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  note.textContent = 'お問い合わせありがとうございます。担当者より折り返しご連絡いたします。';
  form.reset();
});
