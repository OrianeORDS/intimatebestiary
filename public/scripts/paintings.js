window.addEventListener("scroll", (event) => {
  let paintings = document.querySelectorAll("#paintings article");
  let artsNavGallery = document.querySelectorAll("#nav-gallery li");
  let scroll = this.scrollY;

  let painting;
  for (painting of Array.from(paintings).reverse()) {
    if ((scroll +1 < paintings[0].offsetTop) || (scroll +1 >= paintings[paintings.length-1].offsetTop + paintings[paintings.length-1].offsetHeight) ) {
      document.querySelector("#nav-gallery").classList.add("nav-gallery-hidden");
      painting = "";
    } else if (scroll + 1 >= painting.offsetTop) {
      document.querySelector("#nav-gallery").classList.remove("nav-gallery-hidden");
      break;
    }    
  }
  artsNavGallery.forEach((nav) => {
    nav.matches("." + painting.id)
      ? nav.classList.add("highlight")
      : nav.classList.remove("highlight");
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