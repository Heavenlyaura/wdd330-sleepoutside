


// import { loadHeaderFooter } from "./utils.mjs";
// import CheckoutProcess from "./CheckoutProcess.mjs";

// loadHeaderFooter();

// const checkout = new CheckoutProcess();
// const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
// checkout.displayOrderSummary(cartItems);

// document.getElementById("checkoutForm").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   await checkout.checkout(e.target);
// });


import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess();
const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
checkout.displayOrderSummary(cartItems);

document.getElementById("checkoutForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  if (form.checkValidity()) {
    await checkout.checkout(form);
  } else {
    form.reportValidity();
  }
});
