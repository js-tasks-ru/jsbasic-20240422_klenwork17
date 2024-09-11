import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    
    this.render();
    this.addEventListeners()
    
  }
  render() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>

        <div class="slider__progress" style="width: 0%;"></div>

        <div class="slider__steps">
          
        </div>
      </div>
      `)
      
      let steps = this.sub('steps');

      for(let i = 0; i < this.steps; i++) {
        let step = createElement(`<span data-number="${i}"></span>`);
        steps.append(step);       
      }

      steps.firstElementChild.classList.add('slider__step-active');
    }
    
    sub(ref) {
      return this.elem.querySelector(`.slider__${ref}`);
    }
  
    addEventListeners() {
      this.elem.addEventListener('click', (event) => {
        this.onClick(event);

        this.elem.dispatchEvent(new CustomEvent('slider-change', {
          detail: this.value, 
          bubbles: true 
        }))
      })

      
      let thumb = this.sub('thumb');

      thumb.onpointerdown = (event) => {
        this.elem.classList.add('slider_dragging')

        thumb.style.position = 'absolute';
        thumb.style.zIndex = 1000;

        this.moveAt(event.clientX)  // перенести под курсор

        document.onpointermove = (event) => {
          this.update(event)
        }
        document.onpointerup = (event) => {
          this.elem.classList.remove('slider_dragging');

          this.elem.dispatchEvent(new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
            detail: this.value, // значение 0, 1, 2, 3, 4
            bubbles: true // событие всплывает - это понадобится в дальнейшем
          }))

          document.onpointermove = null;
          document.onpointerup = null;
        }
      }
 
      thumb.ondragstart = () => false;
    }
    
    moveAt(pageX) {
      let thumb = this.sub('thumb');
      let left = pageX - this.elem.getBoundingClientRect().left;

      if (left <= 0) {
        left = 0;
      }
      if (left >= this.elem.offsetWidth) {
        left = this.elem.offsetWidth;
      }

      thumb.style.left = left + 'px';
    }
    update(event) {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      if (leftRelative < 0) {
        leftRelative = 0;
      }
      
      if (leftRelative > 1) {
        leftRelative = 1;
      }

        let leftPercents = leftRelative * 100;
        
        let thumb = this.elem.querySelector('.slider__thumb');
        let progress = this.elem.querySelector('.slider__progress');

        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;


      let approximateValue = leftRelative * (this.steps - 1);
      let value = Math.round(approximateValue)

      if(!(value >= 0 && value <= (this.steps - 1))) return;   // unacceptable values

      this.value = value;
      this.sub('value').textContent = value;
    }
    

    onClick(event) {    
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let approximateValue = leftRelative * (this.steps - 1);
      let value = Math.round(approximateValue);
      
      this.value = value;
      
      this.showNewValue(value); 
    }
    

    showNewValue(newValue) {
      this.sub('value').textContent = newValue;
      
      let spanActive = this.elem.querySelector(`[data-number="${newValue}"]`);
      spanActive.classList.add('slider__step-active');

      let thumb = this.sub('thumb');
      let progress = this.sub('progress');


      let leftPercents = newValue / (this.steps - 1) * 100;

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
    } 
}
