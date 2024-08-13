let navButton = document.querySelector('.navigation__checkbox');
let navLink = document.querySelector('.navigation__link');

navButton.addEventListener('change', function () {
  if (this.checked) {
    navNav.classList.add('navigation__nav--transition');
  } else {
    navNav.classList.remove('navigation__nav--transition');
  }
});

//  Try to add an eventlistener to each link in order to enlight them ... but not working 
navLink.forEach(linkofnav => {
  linkofnav.addEventListener("mouseover", enlighten(e) ) }); 
  
  function enlighten(event){
    console.log(event)
  }

  /*
function enlighten(event) {
    event.srcElement.classList.add('navigation__link--enlighten');
    setTimeout(function () {
      event.srcElement.classList.remove("navigation__link--enlighten");}, 300);
      console.log(event); 
  }*/