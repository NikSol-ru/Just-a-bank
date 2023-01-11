'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll('.btn--show-modal-window');

const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.getElementById('section--1');
const section2 = document.getElementById('section--2');
const section3 = document.getElementById('section--3');

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

  //Современный метод:
  section1.scrollIntoView({ behavior: 'smooth' });
});


//menu click scroll
const navLinks = document.querySelector('.nav__links');
navLinks.addEventListener('click', (e) => {
  e.preventDefault();
  const href = e.target.getAttribute('href');
  if (e.target.getAttribute('href')) {
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});
