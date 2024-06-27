document.querySelector("footer p").append(` ${new Date().getFullYear()}`);

window.addEventListener("scroll", (event) => {
  let arts = document.querySelectorAll("#arts article");
  let artsNavGallery = document.querySelectorAll("#nav-gallery li");
  let scroll = this.scrollY;
  for (art of Array.from(arts).reverse()) {
    if (scroll+1 >= art.offsetTop) {
      break;
    }
    art = "";
  }
  artsNavGallery.forEach(nav => {
    nav.matches("."+art.id)? nav.classList.add("highlight"):nav.classList.remove("highlight") ;
  })
});