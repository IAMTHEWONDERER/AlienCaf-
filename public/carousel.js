document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const nextSlide = document.querySelector(".btn-next");
    const prevSlide = document.querySelector(".btn-prev");
  
    // current slide counter
    let curSlide = 0;
    // maximum number of slides
    const maxSlide = slides.length;
    // interval ID for automatic sliding
    let slideInterval;
  
   function showSlide(index) {
       slides.forEach((slide, indx) => {
       const relativeIndex = (indx - index + maxSlide) % maxSlide;
       slide.classList.toggle("active", relativeIndex === 0);
       slide.classList.toggle("prev", relativeIndex === maxSlide - 1);
       slide.classList.toggle("next", relativeIndex === 1);
     });
    }
  
    function next() {
      curSlide = (curSlide + 1) % maxSlide;
      showSlide(curSlide);
      resetTimer();
    }
  
    function prev() {
      curSlide = (curSlide - 1 + maxSlide) % maxSlide;
      showSlide(curSlide);
      resetTimer();
    }
  
    function resetTimer() {
      clearInterval(slideInterval);
      slideInterval = setInterval(next, 3000);
    }
  
    // add event listeners for next and previous buttons
    nextSlide.addEventListener("click", next);
    prevSlide.addEventListener("click", prev);
  
    // Initial display
    showSlide(curSlide);
  
    // add automatic sliding every 3 seconds (adjust as needed)
    slideInterval = setInterval(next, 3000);
  });
    