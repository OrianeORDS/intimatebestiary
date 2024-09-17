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
  await newImg.addEventListener("load", () => {
    _img.replaceWith(newImg);
    console.log(new Date().toLocaleString(), ": ", _img);
  });
});
