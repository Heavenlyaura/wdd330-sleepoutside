


import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Image}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: <input type="number" class="cart-quantity" data-id="${item.Id}" value="${item.quantity}" min="1" /></p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <span class="remove-item" data-id="${item.Id}">X</span>
    </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    calculateTotal(cartItems);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    this.parentSelector.innerHTML = htmlItems.join("");
    this.addQuantityListeners();
    this.addRemoveItemListeners();
  }
  
  addQuantityListeners() {
    const quantityInputs = document.querySelectorAll(".cart-quantity");
    quantityInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        this.updateQuantity(e.target.dataset.id, e.target.value);
      });
    });
  }

  addRemoveItemListeners() {
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.removeItem(e.target.dataset.id);
      });
    });
  }

  updateQuantity(id, newQuantity) {
    let cart = getLocalStorage(this.key);
    const productIndex = cart.findIndex(item => item.Id === id);
    if (productIndex !== -1 && newQuantity > 0) {
      cart[productIndex].quantity = parseInt(newQuantity);
      setLocalStorage(this.key, cart);
      this.renderCartContents();
    }
  }

  removeItem(id) {
    let cart = getLocalStorage(this.key);
    const updatedCart = cart.filter(item => item.Id !== id);
    setLocalStorage(this.key, updatedCart);
    this.renderCartContents();
  }
}

function calculateTotal(cartItems) {
  if (cartItems) {
    const price = document.querySelector(".cart-total");
    price.style.display = 'block';
    let total = cartItems.reduce((total, item) => total + (item.FinalPrice * item.quantity), 0);
    price.innerHTML = `Total: $${total.toFixed(2)}`;
  }
}
