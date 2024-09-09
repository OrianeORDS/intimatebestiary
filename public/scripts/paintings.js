var pages = document.querySelectorAll("section:not(#background-image),#paintings article,#infos,#infos__artcontainer article:not(#info__something_else)");
var page = {
  index: 0,
  get previous() {return Math.max(this.index - 1, 0)},
  get next() {return Math.min(this.index + 1, pages.length - 1)},
  get current() {return pages[this.index]},
}

var pageNavArrowUp = document.getElementById("nav-scroll__link-arrow-up");
var pageNavArrowDown = document.getElementById("nav-scroll__link-arrow-down");

var paintings = document.querySelectorAll("#paintings article");
var artsNavGallery = document.querySelectorAll("#nav-gallery #nav-gallery-art-icon li");

document.addEventListener("scroll", (event) => {
  console.clear();
  // ===== PAGE =====
  pages.forEach((p, i) => {
      if (p.getBoundingClientRect().top <= 5) {
        page.index = i;
      }
  });
  pageNavArrowUp.href = "#" + pages[page.previous].id;
  pageNavArrowDown.href = "#" + pages[page.next].id;
  
  // ===== NAV-GALLERY & PAINTINGS =====

  document.querySelector("#nav-gallery").classList.remove("nav-gallery-show");
  document.querySelector("#nav-gallery").classList.add("nav-gallery-hide");
  artsNavGallery.forEach((nav) => {
    if (nav.matches("." + page.current.id)) {
      document
        .querySelector("#nav-gallery")
        .classList.remove("nav-gallery-hide");
      document.querySelector("#nav-gallery").classList.add("nav-gallery-show");
      nav.classList.add("highlight");
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
