window.addEventListener("scroll", (event) => {
  let paintings = document.querySelectorAll("#paintings article");
  let artsNavGallery = document.querySelectorAll("#nav-gallery #nav-gallery-art-icon li");
  let scroll = this.scrollY;

  let painting;
  for (painting of Array.from(paintings).reverse()) {
    if ((scroll +1 < paintings[0].offsetTop) || (scroll +1 >= paintings[paintings.length-1].offsetTop + paintings[paintings.length-1].offsetHeight) ) {
      document.querySelector("#nav-gallery").classList.remove("nav-gallery-show");
      document.querySelector("#nav-gallery").classList.add("nav-gallery-hide");
      painting = "";
    } else if (scroll + 1 >= painting.offsetTop) {
      document.querySelector("#nav-gallery").classList.remove("nav-gallery-hide");
      document.querySelector("#nav-gallery").classList.add("nav-gallery-show");
      break;
    }    
  }
  let arrows = document.querySelectorAll("#nav-gallery-arrow-icon a");
  artsNavGallery.forEach((nav, index) => {
    if (nav.matches("." + painting.id)) {
      nav.classList.add("highlight");
      let i = {current: index};
      i.previous = (index + artsNavGallery.length - 1) % artsNavGallery.length;
      i.next = (index + 1) % artsNavGallery.length;
      arrows[0].style.display = "block";
      arrows[0].setAttribute("href", "#" + artsNavGallery[i.previous].className.split(" ")[0]);
      if (index === 0) 
        arrows[0].style.display = "none";

      arrows[1].style.display = "block";
      arrows[1].setAttribute("href", "#" + artsNavGallery[i.next].className.split(" ")[0]);
      if (index === artsNavGallery.length - 1) 
        arrows[1].style.display = "none";
    } else { 
      nav.classList.remove("highlight");
    }
  });
});

//stop other playing audios
document.querySelectorAll("#paintings audio").forEach((audioQueried) => {
  audioQueried.addEventListener("play", (event) => {
    let audioPlayed = event.target;
    document
      .querySelectorAll("#paintings audio")
      .forEach((audioQueriedOnListener) => {
        if (audioQueriedOnListener !== audioPlayed) {
          audioQueriedOnListener.pause();
          // audioQueriedOnListener.currentTime = 0;
        }
      });
  });
});