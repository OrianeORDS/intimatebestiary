var pages = document.querySelectorAll("section:not(#background-image),#paintings article,#infos,#infos__artcontainer article:not(#info__something_else)");

var pageNavArrowUp = document.getElementById("nav-scroll__link-arrow-up");
var pageNavArrowDown = document.getElementById("nav-scroll__link-arrow-down");

var paintings = document.querySelectorAll("#paintings article");
var artsNavGallery = document.querySelectorAll(
  "#nav-gallery #nav-gallery-art-icon li"
);
document.addEventListener("scroll", (event) => {
  // ===== NAV-SCROLL =====
  let page = {};
  let scrollY = window.scrollY + 5;
  for (page.current of Array.from(pages).reverse()) {
    if(scrollY >= page.current.offsetTop) break;
  };
  page.index = Array.from(pages).indexOf(page.current);
  page.previous = Math.max(page.index - 1, 0);
  page.next = Math.min(page.index + 1, pages.length - 1);
  pageNavArrowUp.href = "#" + pages[page.previous].id;
  pageNavArrowDown.href = "#" + pages[page.next].id;


  // ===== PAINTINGS =====
  let painting;
  for (painting of Array.from(paintings).reverse()) {
    if ( ( scrollY < paintings[0].offsetTop ) ||
         ( scrollY >= paintings[paintings.length-1].offsetTop + paintings[paintings.length-1].offsetHeight) )
    {
      document.querySelector("#nav-gallery").classList.remove("nav-gallery-show");
      document.querySelector("#nav-gallery").classList.add("nav-gallery-hide");
      painting = "";
    } else if (scrollY >= painting.offsetTop) {
      document.querySelector("#nav-gallery").classList.remove("nav-gallery-hide");
      document.querySelector("#nav-gallery").classList.add("nav-gallery-show");
      break;
    }    
  }
  artsNavGallery.forEach((nav) => {
    if (nav.matches("." + painting.id)) {
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