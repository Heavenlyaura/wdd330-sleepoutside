import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function cartItemTemplate(item) {
  return `
    <p class="cart-card divider">
      <span class="card__image"><img src="${item.Images.PrimarySmall}" alt="${item.Name}" /></span>
      <span class="card__name">${item.NameWithoutBrand}</h2></span>
      <span class="card__price">$${item.FinalPrice}</span>
      <span class="remove-item" data-id="${item.Id}">X</span>
    </p>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key) || [];
    this.calculateTotal(cartItems);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    this.parentSelector.innerHTML = htmlItems.join("");

    this.parentSelector.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', (e) => this.removeItem(e));
    });
  }

  removeItem(e) {
    const id = e.target.dataset.id;
    let cartItems = getLocalStorage(this.key) || [];
    cartItems = cartItems.filter(item => item.Id !== id);
    setLocalStorage(this.key, cartItems);
    this.renderCartContents();
  }

  calculateTotal(cartItems) {
    const priceElement = document.querySelector(".cart-total");
    if (cartItems.length > 0) {
      priceElement.style.display = 'block';
      const total = cartItems.reduce((total, item) => total + item.FinalPrice, 0);
      priceElement.innerHTML = `Total: $${total.toFixed(2)}`;
    } else {
      priceElement.style.display = 'none';
    }
  }
}

// Initialize the shopping cart
const cart = new ShoppingCart('so-cart', document.querySelector('.product-list'));
cart.renderCartContents();
