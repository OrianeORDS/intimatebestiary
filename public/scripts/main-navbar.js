let navButton = document.querySelector('.navigation__checkbox');
let navLink = document.querySelectorAll('.navigation__link');


navLink.forEach((linkofnav) => 
  linkofnav.addEventListener("mouseover", (event) => {
    event.target.classList.add('navigation__link--enlighten') ;
  })
)
navLink.forEach((linkofnav) => 
  linkofnav.addEventListener("mouseout", (event) => {
    event.target.classList.remove('navigation__link--enlighten')
  })
)
