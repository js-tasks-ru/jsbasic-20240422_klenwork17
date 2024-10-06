import createElement from '../../assets/lib/create-element.js'; 

export default class CartIcon {
  constructor() {
    this.render();  

    this.addEventListeners();
  }

  render() {  
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {  
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (!this.elem.classList.contains('cart-icon_visible')) return;
    if (window.innerWidth <= 767) return;  

    let coords = this.elem.getBoundingClientRect();
    let container = document.getElementsByClassName('container')[0];
    let containerFirstElemCoords = container.firstElementChild.getBoundingClientRect();


    if (window.scrollY > 50 && window.scrollY > coords.top) {
      this.elem.style.position = 'fixed';
      this.elem.style.left = `${containerFirstElemCoords.right + 20}px`

    } else {
      this.elem.style.position = "";
      this.elem.style.left = "";
    }
  
  }
}

