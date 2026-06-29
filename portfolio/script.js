const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
  dot.classList.add('visible');
  ring.classList.add('visible');
});

document.addEventListener('mouseleave', () => {
  dot.classList.remove('visible');
  ring.classList.remove('visible');
});

(function followRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(followRing);
})();

document.querySelectorAll('a, button, .service-card, .edu-card, .nav-btn').forEach(el => {
  el.addEventListener('mouseenter', () => { dot.classList.add('hovered'); ring.classList.add('hovered'); });
  el.addEventListener('mouseleave', () => { dot.classList.remove('hovered'); ring.classList.remove('hovered'); });
});

const titles   = ['Student', 'Aspiring Data Scientist'];
const titleEl  = document.querySelector('.role-text');
let titleIndex = 0, letterCount = 0, erasing = false;

function typeTitle() {
  const word = titles[titleIndex];
  titleEl.textContent = erasing ? word.slice(0, letterCount - 1) : word.slice(0, letterCount + 1);
  erasing ? letterCount-- : letterCount++;

  let delay = erasing ? 55 : 100;
  if (!erasing && letterCount > word.length)  { delay = 2200; erasing = true; letterCount = word.length; }
  else if (erasing && letterCount < 0)        { erasing = false; titleIndex = (titleIndex + 1) % titles.length; letterCount = 0; delay = 400; }

  setTimeout(typeTitle, delay);
}
typeTitle();

const navButtons = document.querySelectorAll('.nav-btn');
const sections   = document.querySelectorAll('.pane[id]');

function setActiveLink() {
  let active = sections[0].id;
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top <= 140) active = sec.id;
  });
  navButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('href') === '#' + active);
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

const barsStarted = { done: false };
const barWatcher  = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !barsStarted.done) {
    barsStarted.done = true;
    document.querySelectorAll('.bar-fill').forEach(el => {
      el.style.width = '0';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.width = el.dataset.w + '%';
      }));
    });
  }
}, { threshold: 0.2 });

const skillsBar = document.querySelector('.skill-bars');
if (skillsBar) barWatcher.observe(skillsBar);

function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.send-btn');
  btn.innerHTML = '<i class="bx bx-check"></i> Sent!';
  btn.style.background = '#2b9e6d';
  setTimeout(() => {
    btn.innerHTML = '<i class="bx bx-send"></i> Send Message';
    btn.style.background = '';
    e.target.reset();
  }, 2500);
}
