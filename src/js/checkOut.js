import CheckoutProcess from './CheckoutProcess.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const checkout = new CheckoutProcess();
checkout.displayOrderSummary();

document.getElementById('checkoutForm').addEventListener('submit', function(event) {
  event.preventDefault();
  checkout.checkout(event.target);
});
