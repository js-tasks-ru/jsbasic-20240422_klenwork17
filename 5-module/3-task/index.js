function initCarousel() {
  const lefttArrow = document.querySelector('.carousel__arrow_left');
  const rightArrow = document.querySelector('.carousel__arrow_right');

  const carouselInner = document.querySelector('.carousel__inner')
  const slide = document.querySelector('.carousel__slide');
  const sildeWidth = slide.offsetWidth; // 988


  let carouselInnerPosition = 0;

  if(carouselInnerPosition == 0) {
    lefttArrow.style.display = 'none';  // На 1м слайде стрелки влево быть не должно, поэтому она убирается
  }

  lefttArrow.addEventListener('click', function(event){

    rightArrow.style.display = '';  // Возвращаем стрелку вправо, если ее убрали

    carouselInnerPosition += sildeWidth;
    carouselInner.style.transform = `translateX(${carouselInnerPosition}px)`;

    if(carouselInnerPosition == 0) {
      lefttArrow.style.display = 'none'
    }

  })

  rightArrow.addEventListener('click', function(event){

    lefttArrow.style.display = '';  // Позиция меняется, поэтому стрелка влево возвращается

    carouselInnerPosition -= sildeWidth;
    carouselInner.style.transform = `translateX(${carouselInnerPosition}px)`;

    if(carouselInnerPosition == -sildeWidth * (4 - 1)) {
      rightArrow.style.display = 'none';
    }
  
  })

}




