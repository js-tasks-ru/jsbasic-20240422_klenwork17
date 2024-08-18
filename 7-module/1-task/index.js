import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    
    this.currentItemNumber = 0;
    this.render();
    this.addEventListeners()
  }

  render() {
    this.elem = createElement(`
    <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

    </div>`)

    let refs = this.categories.map(category => createElement(`
      <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}
      </a>`))

    this.sub('inner').append(...refs);

    this.update()
  }

  sub(ref) {
    return this.elem.querySelector(`.ribbon__${ref}`);
  }

  addEventListeners() {
    let target;
    
    this.elem.onclick = (event) => {
      
      if(target) {
        target.classList.remove('ribbon__item_active');
      }
      
      let link = event.target.closest('.ribbon__item');

      target = event.target;

      if(link) {
        target.classList.add('ribbon__item_active');

        let id = target.closest('[data-id]').dataset.id;
        this.elem.dispatchEvent(new CustomEvent('ribbon-select', { 
          detail: id, 
          bubbles: true 
        }));

        event.preventDefault()
      }
      


      if(target.closest('.ribbon__arrow_right')) {
        this.next()
      }
      if(target.closest('.ribbon__arrow_left')) {
        this.prev()
      }

    }

    this.sub('inner').onscroll = () => {    
      let scrollWidth = this.sub('inner').scrollWidth;
      let scrollLeft = this.sub('inner').scrollLeft;
      let clientWidth = this.sub('inner').clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      // if(scrollRight < 1) {
      //   this.sub('arrow_right').classList.remove('ribbon__arrow_visible');
      // }
      // if(this.sub('inner').scrollLeft == 0) {
      //   this.sub('arrow_left').classList.remove('ribbon__arrow_visible');
      // }
      this.sub('arrow_left').classList.toggle('ribbon__arrow_visible', this.sub('inner').scrollLeft > 0);
      this.sub('arrow_right').classList.toggle('ribbon__arrow_visible', scrollRight >= 1);
    }

  }


  prev() {
    this.currentItemNumber--;
    this.sub('inner').scrollBy(-350, 0)

    this.update()
  }
  next() {
    this.currentItemNumber++;
    this.sub('inner').scrollBy(350, 0)

    this.update();
  }
  
  
  update() {
    this.sub('arrow_right').classList.add('ribbon__arrow_visible');
    this.sub('arrow_left').classList.add('ribbon__arrow_visible');

    // this.sub('arrow_left').classList.toggle('ribbon__arrow_visible', this.sub('inner').scrollLeft > 0);
  }
}
