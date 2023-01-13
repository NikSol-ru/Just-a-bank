'use strict';

///////////////////////////////////////

// element selection
const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll('.btn--show-modal-window');

const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.getElementById('section--1');
const section2 = document.getElementById('section--2');
const section3 = document.getElementById('section--3');

const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');


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
