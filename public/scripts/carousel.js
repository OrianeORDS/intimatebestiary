document.querySelectorAll(".carousel").forEach((carousel) => {
  var items = carousel.querySelectorAll("ul li");
  console.log(items);
  if (items.length > 0) {
    //index
    let index = {
      current: 0,
      get next () { return (this.current + 1) % items.length; },
      get previous() { return (this.current - 1 + items.length) % items.length; },
      target: this.current,
      direction: 0, // 1: next, -1: previous
    };

    // create nav carousel element
    let navCarousel = document.createElement("nav");
    navCarousel.classList.add("carousel-dots");
    carousel.appendChild(navCarousel);

    //include nav dots to nav carousel
    items.forEach(() => {
      let newDot = document.createElement("div");
      carousel.querySelector(".carousel-dots").appendChild(newDot);
    });
    let dots = carousel.querySelectorAll(".carousel-dots div");

    const updateCarousel = () => {
      items.forEach((item,itemIndex) => {
        item.classList.remove("carousel-previous"); 
        item.classList.remove("carousel-current");
        item.classList.remove("carousel-next");
        item.classList.remove("carousel-hidden");
        if (itemIndex === index.previous) item.classList.add("carousel-previous");
        else if (itemIndex === index.current) item.classList.add("carousel-current")
        else if (itemIndex === index.next)item.classList.add("carousel-next")
        else item.classList.add("carousel-hidden");

        dots.forEach(dot => dot.removeAttribute("class"));
        dots[index.current].classList.add("carousel-dots-active");
      });
    }
    updateCarousel();

    items.forEach(item=>{item.addEventListener("click", (e) => {
      if (e.target.closest(".carousel-previous")!== null) index.current = index.previous;
      if (e.target.closest(".carousel-next")!== null) index.current = index.next;
      updateCarousel();
     })
    });
    
    const dotsClick =  () => {
      setTimeout(() =>{
        if (index.current === index.target) return;
        index.current += index.direction;
        updateCarousel();
        dotsClick();
      },200);
    }

    dots.forEach(dot=>{dot.addEventListener("click", async (e) => {
      index.target = [...dots].indexOf(e.target);
      index.direction = Math.sign(index.target - index.current);
      if (index.direction !== 0) dotsClick();
    })});

    carousel.click();
  }
});