document.querySelector("footer p").append(` ${new Date().getFullYear()}`);

window.addEventListener("scroll", (event) => {
  let arts = document.querySelectorAll("#arts article");
  let artsNavGallery = document.querySelectorAll("#nav-gallery li");
  let scroll = this.scrollY;

  for (art of Array.from(arts).reverse()) {
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

  let bgiElement = document.querySelector("#background-image-container");
  let backgroundImage = `url('public/images/arts/paintings/${art.id}_lr.jpg')`;
  backgroundImage = art !== "" ? backgroundImage : "";
  bgiElement.style.backgroundImage = backgroundImage;
});

//stop other playing audios
document.querySelectorAll("#arts audio").forEach((audioQueried) => { 
  audioQueried.addEventListener("play", (event) => {
    let audioPlayed = event.target;
    document.querySelectorAll("#arts audio").forEach((audioQueriedOnListener) => {
      if (audioQueriedOnListener !== audioPlayed) {
        audioQueriedOnListener.pause();
        audioQueriedOnListener.currentTime = 0;
      }
    });
  });
});

// insert image on a frame
// new code based on CSS from John Skowronski (@john_skowronski)
// https://codepen.io/john_skowronski/pen/Egqqjy
// pair css included on main.css
document.querySelectorAll("#arts article figure img").forEach((artFigure) => {
  let newHTML = `
<div class="frame-outerBevel">
  <div class="frame-flatSurface">
    <div class="frame-innerBevel">
      ${artFigure.outerHTML}
    </div>
  </div>
</div>
`;
artFigure.outerHTML = newHTML;
console.log(artFigure);
});