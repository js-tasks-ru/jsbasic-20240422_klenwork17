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
        <div class="slider__thumb" ">
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
