document.querySelector("footer p").append(` ${new Date().getFullYear()}`);

var ioFooter = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    let giraffes = document.querySelectorAll("footer .footer-giraffe");
    if (entry.isIntersecting) {
      giraffes.forEach((giraffe) => {
        giraffe.classList.remove("hide-giraffe");
        giraffe.classList.add("show-giraffe");
      });
    } else {
      giraffes.forEach((giraffe) => {
        giraffe.classList.remove("show-giraffe");
        giraffe.classList.add("hide-giraffe");
      });
    }
  });
}
);
ioFooter.observe(document.querySelector("footer"));