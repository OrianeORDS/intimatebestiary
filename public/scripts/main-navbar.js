const navButton = document.querySelector('.navigation__checkbox');
const navBackground = document.querySelector('.navigation__background');
const navNav = document.querySelector('.navigation__nav');

navButton.addEventListener('change', function () {
  if (this.checked) {
    navBackground.classList.add('navigation__background--transition');
    navNav.classList.add('navigation__nav--transition');
  } else {
    navBackground.classList.remove('navigation__background--transition');
    navNav.classList.remove('navigation__nav--transition');
  }
});