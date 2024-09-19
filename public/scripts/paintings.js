const updatePaintings = () => {

  const phoneBreakpoint = () => getComputedStyle(document.documentElement).getPropertyValue("--phone-breakpoint").slice(0, -2);
  const isPhone = () => innerWidth <= phoneBreakpoint();

  const refreshPages = () => !isPhone() ? document.querySelectorAll( "section:not(#background-image), #paintings article, #infos,#infos__artcontainer article:not(#info__something_else)" ) : document.querySelectorAll( "section:not(#background-image), #infos,#infos__artcontainer article:not(#info__something_else)" );
  var pages = refreshPages();

  var page = { 
    index: 0,
    get previous() { return Math.max(this.index - 1, 0); },
    get next() { return Math.min(this.index + 1, pages.length - 1); },
    get current() { return pages[this.index]; },
  };
  const updatePage = () => pages.forEach((_p, _i) => _p.getBoundingClientRect().top <= 5 && (page.index = _i));
  updatePage();

  var artsNavGallery = document.querySelectorAll( "#nav-gallery #nav-gallery-art-icon li" );
  var paintings = document.querySelectorAll("#paintings, #paintings article");

  const updateNavArrows = () => {
    document.getElementById("nav-scroll__link-arrow-up").href = "#" + pages[page.previous].id;
    document.getElementById("nav-scroll__link-arrow-down").href = "#" + pages[page.next].id;;
  }
  updateNavArrows();

  document.getElementById("nav-scroll").style.display = "block";

  // ----------------------------------------------------------------
  const ElementDisplay = (_element, _show = true) => {
    _element.classList.toggle("element-hide", !_show);
    _element.classList.toggle("element-show", _show);
  }
  // ----------------------------------------------------------------
  const ShowHideNavGallery = () => {
    let navGallery = document.querySelector("#nav-gallery");
    if (isPhone()) {
      ElementDisplay(navGallery, true);        
    } else {
      updatePage();
      if ([...paintings].some(_p => _p === page.current)) 
        ElementDisplay(navGallery, true);        
      else 
        navGallery.removeAttribute("class");
    }
  }
  // ----------------------------------------------------------------
  window.addEventListener("resize", WindowResize);
  function WindowResize() {
    pages = refreshPages();
    if (isPhone()) { 
      artsNavGallery.forEach( (_nav) => (_nav.querySelector("a").href = "#paintings") );
      ![...artsNavGallery].some((nav) => nav.matches(".highlight")) && [...artsNavGallery].filter((nav) => nav.matches(".hippopotame"))[0].classList.add("highlight");
      paintings.forEach((_p) => {
        !_p.matches("#paintings") && ElementDisplay( _p, [...artsNavGallery].some((nav) => nav.matches("." + _p.id + ".highlight") ) );
      });
    } else {
      artsNavGallery.forEach((_nav) => {
        _nav.querySelector("a").href = !_nav.matches(".nav-gallery__arrow") ? "#" + _nav.classList[0] : "";
        _nav.classList.toggle("highlight", _nav.matches("." + page.current.id));
        paintings.forEach( (_p) => !_p.matches("#paintings") && _p.classList.remove("element-show", "element-hide") );
      });
    }
    updatePage();
    ShowHideNavGallery();
  }
  WindowResize();
  // ----------------------------------------------------------------
  artsNavGallery.forEach((_nav) => { _nav.querySelector("a").addEventListener("click", (_event) => { 
    if (isPhone()) {
        let _clickIndex = null;
        if (_event.target.closest(".nav-gallery__arrow") !== null)
          artsNavGallery.forEach((__nav, __index) => {
            if (__nav.matches(".highlight")) {
              _clickIndex = __index + artsNavGallery.length;
              _clickIndex += _event.target.closest("#nav-gallery__arrow-left") ? -4 : 7;
              _clickIndex %= artsNavGallery.length - 2;
              _clickIndex += 1;
            }
          });
        paintings.forEach((_p) => !_p.matches("#paintings") && ElementDisplay(_p, _nav.matches("." + _p.id)) );
        artsNavGallery.forEach((__nav, __index) => __nav.classList.toggle( "highlight", __nav === _nav && !(_event.target.closest(".nav-gallery__arrow") !== null) ) );
        _clickIndex && artsNavGallery[_clickIndex].querySelector("img").click();
      }
    });
  });
  // ----------------------------------------------------------------
  document.addEventListener("scroll", () => {
    updatePage();
    updateNavArrows();
    ShowHideNavGallery();
    !isPhone() && artsNavGallery.forEach((nav) => { nav.classList.toggle("highlight", nav.matches("." + page.current.id)); });
  });
  // ----------------------------------------------------------------
  document.querySelectorAll("#paintings__container img").forEach(async (_img) => {
    let newImg = document.createElement("img");
    newImg.src = _img.src.replace(/_lr.jpg/, "_hr.jpg");
    newImg.alt = _img.alt;
    await newImg.addEventListener("load", () => _img.replaceWith(newImg));
  });  
};
updatePaintings();

const updateAudio = () => {
  let _audios = document.querySelectorAll("#paintings__container audio");

  const stopPlayingOtherAudios = (playingAudio) => {
    _audios.forEach((_audioToStop) => {
      if (_audioToStop !== playingAudio) {
        _audioToStop.pause();
        _audioToStop.currentTime = 0;
      }
    });
  }

  _audios.forEach(async (_audio,_index) => {
    _audio.addEventListener("play", (event) => stopPlayingOtherAudios(event.target));
    let _newAudio = _audio.cloneNode(true);
    _newAudio.setAttribute("src", _audio.src.replace(/_lr.mp3/, "_hr.mp3"));
    _newAudio.load();
    await _newAudio.addEventListener("canplaythrough", () => {
      _newAudio.removeEventListener("canplaythrough", this);
      _audio.removeEventListener("play", stopPlayingOtherAudios);
      _newAudio.addEventListener("play", (event) => stopPlayingOtherAudios(event.target));
      _audio.replaceWith(_newAudio);
      _audios = document.querySelectorAll("#paintings__container audio");
    });
  });
};
updateAudio();
