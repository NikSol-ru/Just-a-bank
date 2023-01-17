'use strict';

///////////////////////////////////////

// element selection
const header = document.querySelector('.header');

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll('.btn--show-modal-window');

const btnScrollTo = document.querySelector('.btn--scroll-to');

const allSections = document.querySelectorAll('.section');
const section1 = document.getElementById('section--1');
const section2 = document.getElementById('section--2');
const section3 = document.getElementById('section--3');

const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

const lazyImages = document.querySelectorAll('img[data-src]');

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');


// Modal window
const openModalWindow = function () {
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    openModalWindow();
  });
});

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});


//Scroll to
btnScrollTo.addEventListener('click', (e) => {
  e.preventDefault();
  // Старый метод:
  // const section1Coords = section1.getBoundingClientRect();
  // console.log(section1Coords);
  // window.scrollTo({
  //   left: section1Coords.left + window.pageXOffset,
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  // Современный метод:
  section1.scrollIntoView({ behavior: 'smooth' });
});


// menu click scroll
navLinks.addEventListener('click', (e) => {
  e.preventDefault();
  const href = e.target.getAttribute('href');
  if (!e.target.classList.contains('nav__link--btn') && e.target.classList.contains('nav__link')) {
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

// tab operations
tabContainer.addEventListener('click', (e) => {
  e.preventDefault();
  const btnClicked = e.target.closest('.operations__tab');
  if (!btnClicked) { return; }
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabContent.forEach(elem => elem.classList.remove('operations__content--active'));
  btnClicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${btnClicked.dataset.tab}`).classList.add('operations__content--active');
});

// Navigation bar fade animation

const navLinksHoverAnimation = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target;
    const siblingLink = linkOver.closest('.nav__links').querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('.nav__logo');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');
    siblingLink.forEach(link => {
      if (link !== linkOver) {
        link.style.opacity = this;
      }
    });
    logo.style.opacity = logoText.style.opacity = this;
  }
};

nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4));

nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1));

// Sticky navigation

const navSticky = function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      nav.classList.remove('sticky');
    } else {
      nav.classList.add('sticky');
    }
  });
};

const headerObserver = new IntersectionObserver(navSticky, {
  root: null,
  threshold: 0,
  rootMargin: '-100px',
});
headerObserver.observe(header);


//the appearance of sections of the site

const appearanceSection = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    }
  });
};

const sectionObserver = new IntersectionObserver(appearanceSection, {
  root: null,
  threshold: 0.2,
  rootMargin: '0px',
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});


//Lazy loading
const lazyLoading = function (entries, observer) {
  const entry = entries[0];
  if (entry.isIntersecting) {
    entry.target.classList.remove('lazy-img');
    entry.target.src = entry.target.dataset.src;
    observer.unobserve(entry.target);
  }
};

const lazyImagesObserver = new IntersectionObserver(lazyLoading, {
  root: null,
  threshold: 0.8,
});

lazyImages.forEach(img => lazyImagesObserver.observe(img));


//Creating a slider
let currentSlide = 0;
const slideNumber = slides.length;

const createDots = function () {
  slides.forEach((_, index) => {
    dotsContainer.insertAdjacentHTML('beforeEnd', `<button class = "dots__dot" data-slide = "${index}"></button>`);
  });
};

createDots();

const activateCurrentDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(e => {
    e.classList.remove('dots__dot--active');
  });
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

const moveToSlide = function (slide) {
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${(index - slide) * 100}%)`;
  });
  activateCurrentDot(slide);
};

moveToSlide(0);

const nextSlide = function () {
  (currentSlide === slideNumber - 1) ? currentSlide = 0 : currentSlide++;
  moveToSlide(currentSlide);
};

const previousSlide = function () {
  (currentSlide === 0) ? currentSlide = slideNumber - 1 : currentSlide--;
  moveToSlide(currentSlide);
};

btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    nextSlide();
  }
  if (e.key === 'ArrowLeft') {
    previousSlide();
  }
});

dotsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dots__dot')) {
    currentSlide = +e.target.dataset.slide;
    moveToSlide(currentSlide);
  }
});

