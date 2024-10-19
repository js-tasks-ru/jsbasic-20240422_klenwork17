import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filteredProducts = products;
    this.filters = {};

    this.render();
  }
  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
          
        </div>
      </div>
    `)
    
    let productCards = this.products.map(product => {
      let card = new ProductCard(product);
      return card.elem;
    })

    this.sub('inner').append(...productCards);
  }
  
  sub(ref) {
    return this.elem.querySelector(`.products-grid__${ref}`);
  }

  updateFilter(filters) {
      this.filteredProducts = this.filteredProducts.filter((product) => {
        let isValid = true;

        if (filters.noNuts !== undefined) {
          isValid = isValid && (filters.noNuts ? !product.nuts : true);
        }
        if (filters.vegeterianOnly !== undefined) {
          isValid = isValid && (product.vegeterian === true);
        }
        if (filters.maxSpiciness !== undefined) {
          isValid = isValid && (product.spiciness <= filters.maxSpiciness);
        }
        if (filters.category !== undefined && filters.category !== '') {
          isValid = isValid && (product.category === filters.category);
        }

        return isValid;
    });

    let filteredCards = this.filteredProducts.map(product => {
      let card = new ProductCard(product);
      return card.elem;
    })

    this.sub('inner').innerHTML = '';
    this.sub('inner').append(...filteredCards); 
  }
}
