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

// ----------------------------------------------------------------
function ElementDisplay(_element, _show = true) {
  _element.classList.toggle("element-hide", !_show);
  _element.classList.toggle("element-show", _show);
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

  pages.forEach((_p, _i) =>
    _p.getBoundingClientRect().top <= 5 ? (page.index = _i) : null
  );

  if (isPhoneSized) {
    ElementDisplay(document.querySelector("#nav-gallery"), true);

    artsNavGallery.forEach(
      (_nav) => (_nav.querySelector("a").href = "#paintings")
    );

    ![...artsNavGallery].some((nav) => nav.matches(".highlight")) &&
      [...artsNavGallery]
        .filter((nav) => nav.matches(".hippopotame"))[0]
        .classList.add("highlight");

    paintings.forEach((_p) => {
      !_p.matches("#paintings") &&
        ElementDisplay(
          _p,
          [...artsNavGallery].some((nav) =>
            nav.matches("." + _p.id + ".highlight")
          )
        );
    });
  } else {
    artsNavGallery.forEach((_nav) => {
      _nav.querySelector("a").href = !_nav.matches(".nav-gallery__arrow")
        ? "#" + _nav.classList[0]
        : "";

      _nav.classList.toggle("highlight", _nav.matches("." + page.current.id));

      paintings.forEach(
        (_p) =>
          !_p.matches("#paintings") &&
          _p.classList.remove("element-show", "element-hide")
      );
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
            _clickIndex += _event.target.closest("#nav-gallery__arrow-left")
              ? -4
              : 7;
            _clickIndex %= artsNavGallery.length - 2;
            _clickIndex += 1;
          }
        });
      }

      paintings.forEach(
        (_p) =>
          !_p.matches("#paintings") &&
          ElementDisplay(_p, _nav.matches("." + _p.id))
      );

      artsNavGallery.forEach((__nav, __index) =>
        __nav.classList.toggle(
          "highlight",
          __nav === _nav &&
            !(_event.target.closest(".nav-gallery__arrow") !== null)
        )
      );

      if (_clickIndex) artsNavGallery[_clickIndex].querySelector("img").click();
    }
  });
});

// ----------------------------------------------------------------
document.addEventListener("scroll", (event) => {
  pages.forEach(
    (p, i) => p.getBoundingClientRect().top <= 5 && (page.index = i)
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

  !isPhoneSized &&
    artsNavGallery.forEach((nav) => {
      nav.classList.toggle("highlight", nav.matches("." + page.current.id));
    });
});

document.querySelectorAll("#paintings__container img").forEach(async (_img) => {
  let newImg = document.createElement("img");
  newImg.src = _img.src.replace(/_lr.jpg/, "_hr.jpg");
  newImg.alt = _img.alt;
  await newImg.addEventListener("load", () => _img.replaceWith(newImg));
});

const updateAudio = () => {
  let _audios = document.querySelectorAll("#paintings__container audio");
  const updateAudioListeners = () => {
    //stop other playing audios
    _audios.forEach((_audio) => {
      _audio.addEventListener("play", (event) => {
        console.log(event.target);
        let audioPlaying = event.target;
        _audios.forEach((_audioToStop) => {
          _audioToStop !== audioPlaying && _audioToStop.pause();
          _audioToStop.currentTime = 0;
        });
      });
    });
  };
  updateAudioListeners();
  const replaceAudio = () => {
    _audios.forEach(async (_audio, _index) => {
      let newAudio = document.createElement("audio");
      [..._audio.attributes].forEach((attr) =>
        newAudio.setAttribute(attr.nodeName, attr.nodeValue)
      );
      newAudio.setAttribute("src", _audio.src.replace(/_lr.mp3/, "_hr.mp3"));
      await newAudio.addEventListener("canplaythrough", () => {
        _audio.replaceWith(newAudio);
        _audios[_index] = newAudio;
        updateAudioListeners();
        _audio.removeEventListener("canplaythrough", this);
      });
    });
  };
};
updateAudio();
