document.querySelector("#sculptures.nojs").classList.remove("nojs");
document.querySelectorAll(".carousel").forEach((carousel) => {
  var items = carousel.querySelectorAll("ul li");
  if (items.length > 0) {
    //index
    let index = {
      current: 0,
      get next () { return (this.current + 1) % items.length; },
      get previous() { return (this.current - 1 + items.length) % items.length; },
      target: this.current,
      get direction() { return Math.sign(this.target - this.current); } // 1: next, 0: current, -1: previous
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
        item.classList.toggle("carousel-previous", itemIndex === index.previous); 
        item.classList.toggle("carousel-current", itemIndex === index.current);
        item.classList.toggle("carousel-next", itemIndex === index.next);
        item.classList.toggle("carousel-hidden", itemIndex !== index.previous && itemIndex !== index.current && itemIndex !== index.next);
      });
      dots.forEach((dot, dotIndex) => dot.classList.toggle("carousel-dots-active", dotIndex===index.current));
    }
    updateCarousel();

    items.forEach(item=>{item.addEventListener("click", (event) => {
      index.target = [...items].indexOf(event.target.closest("li"));
      index.current = index.target;
      updateCarousel();
     })
    });
    
    const dotsClick =  () => {
      (index.direction !== 0) &&
        setTimeout(() =>{
            if (index.current === index.target) return;
            index.current += index.direction;
            updateCarousel();
            dotsClick();
        },180);
    }

    dots.forEach(dot=>{dot.addEventListener("click", async (event) => {
      index.target = [...dots].indexOf(event.target);
      if (index.direction !== 0) dotsClick();
    })});

    carousel.click();
  }
});