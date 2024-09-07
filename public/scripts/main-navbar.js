let navButton = document.querySelector('.navigation__checkbox');
let navLink = document.querySelectorAll('.navigation__link');


navLink.forEach((linkofnav) => 
  linkofnav.addEventListener("mouseover", (event) => {
    event.target.classList.remove('navigation__link--darken') ;
  })
)
navLink.forEach((linkofnav) => 
  linkofnav.addEventListener("mouseout", (event) => {
    event.target.classList.add('navigation__link--darken')
  })
)


document.addEventListener('click', (event) => {
  console.log(event); 
  if (! event.target.matches('nav, nav *')) {
    document.getElementById("navi-toggle").checked = false
  }
})
