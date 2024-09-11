var phoneBreakpoint = getComputedStyle(document.documentElement)
  .getPropertyValue("--phone-breakpoint")
  .slice(0, -2);
var isPhoneSized = innerWidth <= phoneBreakpoint;

var pages = !isPhoneSized
  ? document.querySelectorAll(
      "section:not(#background-image), #paintings article, #infos,#infos__artcontainer article:not(#info__something_else)"
    )
  : document.querySelectorAll(
      "section:not(#background-image), #infos,#infos__artcontainer article:not(#info__something_else)"
    );
var page = {
  index: 0,
  get previous() {
    return Math.max(this.index - 1, 0);
  },
  get next() {
    return Math.min(this.index + 1, pages.length - 1);
  },
  get current() {
    return pages[this.index];
  },
};

var pageNavArrowUp = document.getElementById("nav-scroll__link-arrow-up");
var pageNavArrowDown = document.getElementById("nav-scroll__link-arrow-down");
pageNavArrowUp.href = "#" + pages[page.previous].id;
pageNavArrowDown.href = "#" + pages[page.next].id;
document.getElementById("nav-scroll").style.display = "block";

var artsNavGallery = document.querySelectorAll(
  "#nav-gallery #nav-gallery-art-icon li"
);

var paintings = document.querySelectorAll("#paintings, #paintings article");

function ElementDisplay(element, show = true) {
  element.classList.toggle("element-hide", !show);
  element.classList.toggle("element-show", show);
}
function WindowResize() {
  isPhoneSized = innerWidth <= phoneBreakpoint;

  pages = !isPhoneSized
    ? document.querySelectorAll(
        "section:not(#background-image), #paintings article, #infos,#infos__artcontainer article:not(#info__something_else)"
      )
    : document.querySelectorAll(
        "section:not(#background-image), #infos,#infos__artcontainer article:not(#info__something_else)"
      );

  pages.forEach((p, i) =>
    p.getBoundingClientRect().top <= 5 ? (page.index = i) : null
  );

  if (isPhoneSized) {
    artsNavGallery.forEach(
      (nav) => (nav.querySelector("a").href = "#paintings")
    );
    if (![...artsNavGallery].some((nav) => nav.matches(".highlight")))
      artsNavGallery[1].classList.add("highlight");
    paintings.forEach((p) =>
      !p.matches("#paintings")
        ? ElementDisplay(
            p,
            [...artsNavGallery].some((nav) =>
              nav.matches("." + p.id + ".highlight")
            )
          )
        : null
    );
  } else {
    artsNavGallery.forEach((nav) => {
      nav.querySelector("a").href = !nav.matches(".nav-gallery__arrow")
        ? "#" + nav.classList[0]
        : "";
      nav.classList.toggle("highlight", nav.matches("." + page.current.id));
      paintings.forEach((p, i) => (i !== 0 ? ElementDisplay(p, true) : null));
    });
  }
}
window.addEventListener("resize", WindowResize);
WindowResize();
// ----------------------------------------------------------------

artsNavGallery.forEach((_nav) => {
  _nav.querySelector("a").addEventListener("click", (_event) => {
    if (isPhoneSized) {
      let _clickIndex = null;
      if (_event.target.closest(".nav-gallery__arrow") !== null) {
        artsNavGallery.forEach((__nav, __index) => {
          if (__nav.matches(".highlight")) {
            _clickIndex = __index + artsNavGallery.length;
            _clickIndex += _event.target.closest("#nav-gallery__arrow-left") ? -4 : 7;
            // _clickIndex = Math.max(1,Math.min(artsNavGallery.length-2, _clickIndex));
            _clickIndex %= artsNavGallery.length - 2;
            _clickIndex += 1;

          }
        });
      }
      paintings.forEach((_p) =>
        !_p.matches("#paintings")
          ? ElementDisplay(_p, _nav.matches("." + _p.id))
          : null
      );
      artsNavGallery.forEach((__nav, __index) =>
        __nav.classList.toggle("highlight",__nav === _nav &&!(_event.target.closest(".nav-gallery__arrow") !== null)));
      if (_clickIndex ) artsNavGallery[_clickIndex].querySelector("img").click();
    }
  });
});

// ----------------------------------------------------------------
document.addEventListener("scroll", (event) => {
  pages.forEach((p, i) =>
    p.getBoundingClientRect().top <= 5 ? (page.index = i) : null
  );

  pageNavArrowUp.href = "#" + pages[page.previous].id;
  pageNavArrowDown.href = "#" + pages[page.next].id;

  let isOnPaintings = page.current.id === "paintings";
  paintings.forEach(
    (p) => (isOnPaintings ||= p.matches("." + page.current.id))
  );

  ElementDisplay(
    document.querySelector("#nav-gallery"),
    isOnPaintings || isPhoneSized
  );

  if (!isPhoneSized)
    artsNavGallery.forEach((nav) => {
      nav.classList.toggle("highlight", nav.matches("." + page.current.id));
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
