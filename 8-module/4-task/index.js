import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
    this.onClickListener = this.onClickListener.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  addProduct(product) {
    if (!product) return;

    let newProduct = {
      product: product,
      count: 1
    }

    let cartItem = this.cartItems.find(
      cartItem => cartItem.product.id === newProduct.product.id
    );

    if (!cartItem) {
      this.cartItems.push(newProduct);
    } else {
      cartItem.count++;
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((cartItem) => cartItem.product.id === productId);
    if (!cartItem) return;

    if (amount === 1) cartItem.count++;  
    else if (amount === -1) cartItem.count--;

    if (cartItem.count === 0) {
      let emptyProductIndex = this.cartItems.indexOf(cartItem);
      this.cartItems.splice(emptyProductIndex, 1);
    }
  
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {   
    return this.cartItems.reduce((sum, cartItem) => sum + cartItem.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((currentSum, cartItem) => currentSum + (cartItem.product.price * cartItem.count), 0);
    
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>  
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    this.modalBody = document.createElement('div'); 
    let orderedProducts = this.cartItems.map(
      item => this.renderProduct(item.product, item.count)
    );
    let orderForm = this.renderOrderForm();
    
    this.modalBody.append(...orderedProducts, orderForm);
    this.modal.setBody(this.modalBody); 
    this.modal.open(); 

    document.removeEventListener('click', this.onClickListener)
    document.addEventListener('click', this.onClickListener);
    
    orderForm.removeEventListener('submit', this.onSubmit);
    orderForm.addEventListener('submit', this.onSubmit);
    
  }

  onClickListener(event) {
    let cartCounterButton = event.target.closest('.cart-counter__button');
    if (!cartCounterButton) return;

    let productId = event.target.closest('[data-product-id]').dataset.productId; 

    if (cartCounterButton.classList.contains('cart-counter__button_plus')) {
      this.updateProductCount(productId, 1);
    }
    if(cartCounterButton.classList.contains('cart-counter__button_minus')) {
      this.updateProductCount(productId, -1);
    } 
  }
  



  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!this.modal || !document.body.classList.contains('is-modal-open')) {
      return;
    }

    if (this.isEmpty()) {
      this.modal.close();
      return;
    }
    this.modalBody = document.querySelector('.modal__body div');

    let productId = cartItem.product.id;

    this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`).innerHTML = cartItem.count;
    
    this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`).innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;

    this.modalBody.querySelector(`.cart-buttons__info-price`).innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    
    

  }

  async onSubmit(event) {
    event.preventDefault();

    this.modalBody
      .querySelector('button[type="submit"]')
      .classList.add("is-loading");
    let form = this.modalBody.querySelector('.cart-form');
    let userData = new FormData(form);

    await fetch('https://httpbin.org/post', { method: 'POST', body: userData });

    this.modal.setTitle("Success!");
    this.modalBody
      .querySelector('button[type="submit"]')
      .classList.remove("is-loading");

    this.cartItems = [];
    this.cartIcon.update(this);

    this.modalBody.innerHTML = `
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
      `;
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}


// Остались onSubmit 


// решить проблему с привязкой bind