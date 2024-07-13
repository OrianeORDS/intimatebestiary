document.querySelectorAll(".carousel").forEach((carousel) => {
  var imgs = carousel.querySelectorAll("ul li img");
  let index = {
    current: imgs.length > 0 ? 0 : -1,
    get next() { return (this.current + 1) % imgs.length; },
    get previous() { return (this.current - 1 + imgs.length) % imgs.length; },
  };
  if (index.current > -1) {
    carousel.addEventListener("click", (e) => {
      if (e.target.classList.contains("carousel-prev"))
        index.current = index.previous;
      if (e.target.classList.contains("carousel-next"))
        index.current = index.next;
      imgs.forEach((img, i) => {
        img.removeAttribute('class');
        if (i === index.previous) {
          img.classList.add("side-left");
        } else if (i === index.current){
          img.classList.add("current");
        } else if (i === index.next){
          img.classList.add("side-right");
        } else {
          img.classList.add("hidden");
        }
      });
    });
    carousel.click();
  }
});