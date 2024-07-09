window.addEventListener("scroll", (event) => {
  let paintings = document.querySelectorAll("#paintings article");
  let artsNavGallery = document.querySelectorAll("#nav-gallery li");
  let scroll = this.scrollY;

  let art;
  for (art of Array.from(paintings).reverse()) {
    if (scroll + 1 >= art.offsetTop) {
      break;
    }
    art = "";
  }
  artsNavGallery.forEach((nav) => {
    nav.matches("." + art.id)
      ? nav.classList.add("highlight")
      : nav.classList.remove("highlight");
  });
});

//stop other playing audios
document.querySelectorAll("#arts audio").forEach((audioQueried) => {
  audioQueried.addEventListener("play", (event) => {
    let audioPlayed = event.target;
    document
      .querySelectorAll("#arts audio")
      .forEach((audioQueriedOnListener) => {
        if (audioQueriedOnListener !== audioPlayed) {
          audioQueriedOnListener.pause();
          audioQueriedOnListener.currentTime = 0;
        }
      });
  });
});
