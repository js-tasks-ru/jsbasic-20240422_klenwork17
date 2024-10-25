export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;

    let newProduct = {
      product: product,
      count: 1
    }

    let existingProduct = this.cartItems.find((cartItem) => cartItem.product.id === newProduct.product.id);

    if (!existingProduct) {
      this.cartItems.push(newProduct);
    } else {
      existingProduct.count++;
    }

    this.onProductUpdate(this.cartItems); // обновление корзины
  }

  updateProductCount(productId, amount) {
    let currentProduct = this.cartItems.find((cartItem) => cartItem.product.id === productId);

    if (amount === 1) currentProduct.count++;  
    else if (amount === -1) currentProduct.count--;

    if (currentProduct.count === 0) {
      let emptyProductIndex =  this.cartItems.indexOf(currentProduct);
      this.cartItems.splice(emptyProductIndex, 1);
    }

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {   
    let count = this.cartItems.reduce((sum, cartItem) => sum + cartItem.count, 0);
    return count;
  }

  getTotalPrice() {
    let sum = this.cartItems.reduce((currentSum, cartItem) => currentSum + (cartItem.product.price * cartItem.count), 0);
    return sum;
  }

  onProductUpdate(cartItem) {

    this.cartIcon.update(this); // обновление корзины
  }
}


