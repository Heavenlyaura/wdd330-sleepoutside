


import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess();
const cartItems = getLocalStorage("so-cart");

checkout.displayOrderSummary(cartItems);

document.querySelector('#checkoutForm').addEventListener('submit', (e) => {
  e.preventDefault();
  checkout.checkout(e.target);
});
