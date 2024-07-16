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
    carousel.addEventListener("click", async (e) => {
      carousel
        .querySelectorAll(".carousel-dots div")
        .forEach((d) => d.classList.remove("carousel-dots-active"));
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
          carousel
            .querySelector(".carousel-dots div:nth-child(" + (i + 1) + ")")
            .classList.add("carousel-dots-active");
        } else if (i === index.next) {
          img.classList.add("carousel-next");
        } else {
          img.classList.add("carousel-hidden");
        }
      });
      if (
        Array.from(document.querySelectorAll(".carousel-dots div")).includes(
          e.target
        )
      ) {
        var dotIndex = Array.from(
          document.querySelectorAll(".carousel-dots div")
        ).indexOf(e.target);
        while (index.current !== dotIndex) {
          var next = document.querySelector(".carousel-next");
          var previous = document.querySelector(".carousel-previous");
          (dotIndex - index.current) > 0 ? next.click() : previous.click();
          await new Promise(resolve => setTimeout(resolve, 333))
        }
      }
    });
    carousel.click();
  }
});
