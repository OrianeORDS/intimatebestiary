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
