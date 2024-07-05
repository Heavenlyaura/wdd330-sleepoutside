import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
    this.calculateOrderTotal();
  }

  calculateItemSummary() {
    // Calculate the total amount of the items in the cart and the number of items.
    this.itemTotal = this.list.reduce((total, item) => total + item.FinalPrice, 0);
    const itemCount = this.list.length

    // Display the item total and item count (example)
    document.querySelector(this.outputSelector).innerHTML = `
      <p>Total Items: ${itemCount}</p>
      <p>Total Amount: $${this.itemTotal.toFixed(2)}</p>
    `;
  }

  calculateOrderTotal() {
    // Example shipping and tax calculation
    this.shipping = this.itemTotal > 50 ? 0 : 5; // Free shipping for orders over $50
    this.tax = this.itemTotal * 0.06; // 6% tax

    // Calculate the order total
    this.orderTotal = this.itemTotal + this.shipping + this.tax;

    // Display the totals
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // Display the calculated totals in the order summary page
    document.querySelector(this.outputSelector).innerHTML += `
      <p>Shipping: $${this.shipping.toFixed(2)}</p>
      <p>Tax: $${this.tax.toFixed(2)}</p>
      <p>Order Total: $${this.orderTotal.toFixed(2)}</p>
    `;
  }
}

