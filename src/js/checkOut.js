import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkoutProcess = new CheckoutProcess("so-cart", ".order-summary");
checkoutProcess.init();
loadHeaderFooter();

document.forms["checkoutForm"]
.addEventListener("submit", (e) => {
  e.preventDefault();
  // e.target would contain our form in this case
  checkoutProcess.checkout();
});

