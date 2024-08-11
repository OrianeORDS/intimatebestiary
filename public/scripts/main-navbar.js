const navButton = document.querySelector('.navigation__checkbox');
const navBackground = document.querySelector('.navigation__background');
const navNav = document.querySelector('.navigation__nav');

navButton.addEventListener('change', function () {
  if (this.checked) {
    navNav.classList.add('navigation__nav--transition');
  } else {
    navNav.classList.remove('navigation__nav--transition');
  }
});