
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const slides = document.querySelector('.slides');
    const items = document.querySelectorAll('.slide-item');
    const dots = document.querySelectorAll('.dot');

    let counter = 0;
    const size = 100; // shift by 100% per slide
    let autoSlideInterval;

    function updateSlide() {
      slides.style.transform = `translateX(${-size * counter}%)`;
      updatePagination();
    }

    function nextSlide() {
      if (counter >= items.length - 1) {
        counter = 0;
      } else {
        counter++;
      }
      updateSlide();
    }

    function prevSlide() {
      if (counter <= 0) {
        counter = items.length - 1;
      } else {
        counter--;
      }
      updateSlide();
    }

    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetTimer();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetTimer();
    });

    function startTimer() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextSlide, 2300);
    }

    function resetTimer() {
      clearInterval(autoSlideInterval);
      startTimer();
    }

    items.forEach((img) => {
      img.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
      });
      img.addEventListener('mouseleave', () => {
        startTimer();
      });
    });

    function updatePagination() {
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      dots[counter].classList.add('active');
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        counter = index;
        updateSlide();
        resetTimer();
      });
    });

    startTimer();
  