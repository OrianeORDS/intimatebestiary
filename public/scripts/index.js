document.querySelector("footer p").append(` ${new Date().getFullYear()}`);

var ioFooter = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    document.querySelectorAll(".footer-giraffe__img").forEach((giraffe) => {
      giraffe.classList.toggle("hide-giraffe", !entry.isIntersecting);
      giraffe.classList.toggle("show-giraffe", entry.isIntersecting);
    });
  });
});
ioFooter.observe(document.querySelector("footer"));

document.querySelectorAll("#paintings__container img").forEach(async (_img) => {
  let newImg = document.createElement("img");
  newImg.src = _img.src.replace(/_lr.jpg/, "_hr.jpg");
  newImg.alt = _img.alt;
  await newImg.addEventListener("load", () => _img.replaceWith(newImg));
});

document
  .querySelectorAll("#paintings__container audio")
  .forEach(async (_audio) => {
    let newAudio = document.createElement("audio");
    [..._audio.attributes].forEach((attr) =>
      newAudio.setAttribute(attr.nodeName, attr.nodeValue)
    );
    newAudio.setAttribute("src", _audio.src.replace(/_lr.mp3/, "_hr.mp3"));
    await newAudio.addEventListener("canplaythrough", () =>
      _audio.replaceWith(newAudio)
    );
  });
