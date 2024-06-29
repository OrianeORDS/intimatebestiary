document.querySelector("footer p").append(` ${new Date().getFullYear()}`);

window.addEventListener("scroll", (event) => {
  let arts = document.querySelectorAll("#arts article");
  let artsNavGallery = document.querySelectorAll("#nav-gallery li");
  let scroll = this.scrollY;

  let art;
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
  let currentImage = window
    .getComputedStyle(bgiElement)
    .getPropertyValue("background-image");
  let newImage = `url('public/images/arts/paintings/${art.id}_lr.jpg')`;
  // newImage = art !== "" ? newImage : "";
  newImage = art && newImage;

  console.log(currentImage);
  console.log(newImage.replace(/url\('/, "").replace(/'\)/, ""));

  if (
    !currentImage.includes(newImage.replace(/url\('/, "").replace(/'\)/, "")) ||
    art === ""
  ) {
    bgiElement.classList.add("hidden");
    window.setTimeout(() => {
      bgiElement.style.backgroundImage = newImage;
      bgiElement.classList.remove("hidden");
      bgiElement.classList.add("visible");
    }, 250);
    window.setTimeout(() => {
      bgiElement.classList.remove("visible");
    }, 250);
  }
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
