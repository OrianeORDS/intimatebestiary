document.querySelectorAll(".carousel").forEach((carousel) => {
  var imgs = carousel.querySelectorAll("ul li img");
  let index = {
    current: imgs.length > 0 ? 0 : -1,
    get next() {
      return (this.current + 1) % imgs.length;
    },
    get previous() {
      return (this.current - 1 + imgs.length) % imgs.length;
    },
  };
  imgs.forEach((img, i) => {
    let newDot = document.createElement("div");
    carousel.querySelector(".carousel-dots").appendChild(newDot);
  });
  if (index.current > -1) {
    carousel.addEventListener("click", (e) => {
      if (e.target.classList.contains("carousel-previous"))
        index.current = index.previous;
      if (e.target.classList.contains("carousel-next"))
        index.current = index.next;
      imgs.forEach((img, i) => {
        img.removeAttribute("class");
        if (i === index.previous) {
          img.classList.add("carousel-previous");
        } else if (i === index.current) {
          img.classList.add("carousel-current");
        } else if (i === index.next) {
          img.classList.add("carousel-next");
        } else {
          img.classList.add("carousel-hidden");
        }
      });
    });
    carousel.click();
  }
});
