import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter()

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    calculateTotal(cartItems)
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    this.parentSelector.innerHTML = htmlItems.join("");
  }
}
function calculateTotal(cartItems) {
  if (cartItems) {

    const price = document.querySelector(".cart-total")
    console.log(price)
    price.style.display = 'block'
    let total = cartItems.reduce((total, item) => total + item.FinalPrice, 0);
    price.innerHTML = `Total: $${total.toFixed(2)}`;
    console.log(total)
  }
}
