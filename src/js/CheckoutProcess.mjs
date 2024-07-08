



import { getLocalStorage, calculateItemSubtotal, calculateShipping, calculateTax, calculateTotal } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { alertMessage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor() {
    this.shippingRate = 10;
    this.taxRate = 0.06;
  }

  displayOrderSummary(cartItems) {
    const subtotal = calculateItemSubtotal(cartItems);
    const shipping = calculateShipping(cartItems);
    const tax = calculateTax(subtotal);
    const total = calculateTotal(subtotal, shipping, tax);

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("shipping").textContent = shipping.toFixed(2);
    document.getElementById("tax").textContent = tax.toFixed(2);
    document.getElementById("orderTotal").textContent = total.toFixed(2);
  }

  async checkout(form) {
    const cartItems = getLocalStorage("so-cart");
    const items = cartItems.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity
    }));

    const orderData = {
      orderDate: new Date().toISOString(),
      fname: form.elements["fname"].value,
      lname: form.elements["lname"].value,
      street: form.elements["street"].value,
      city: form.elements["city"].value,
      state: form.elements["state"].value,
      zip: form.elements["zip"].value,
      cardNumber: form.elements["cardNumber"].value,
      expiration: form.elements["expiration"].value,
      code: form.elements["code"].value,
      items: items,
      orderTotal: document.getElementById("orderTotal").textContent,
      shipping: document.getElementById("shipping").textContent,
      tax: document.getElementById("tax").textContent
    };

    const services = new ExternalServices();
    try {
      const response = await services.checkout(orderData);
      localStorage.removeItem("so-cart");
      window.location.href = "../checkout/success.html";
    } catch (error) {
      console.error("Checkout failed", error);
      alertMessage("Checkout failed: " + error.message.message);
    }
  }
}
