


// import { getLocalStorage } from "./utils.mjs";
// import ExternalServices from "./ExternalServices.mjs";

// export default class CheckoutProcess {
//   constructor() {
//     this.shippingRate = 10;
//     this.taxRate = 0.06;
//   }

//   calculateItemSubtotal(cartItems) {
//     return cartItems.reduce((total, item) => total + item.FinalPrice, 0);
//   }

//   calculateShipping(cartItems) {
//     if (cartItems.length === 0) return 0;
//     return this.shippingRate + (cartItems.length - 1) * 2;
//   }

//   calculateTax(subtotal) {
//     return subtotal * this.taxRate;
//   }

//   calculateTotal(subtotal, shipping, tax) {
//     return subtotal + shipping + tax;
//   }

//   displayOrderSummary(cartItems) {
//     const subtotal = this.calculateItemSubtotal(cartItems);
//     const shipping = this.calculateShipping(cartItems);
//     const tax = this.calculateTax(subtotal);
//     const total = this.calculateTotal(subtotal, shipping, tax);

//     document.getElementById("subtotal").textContent = subtotal.toFixed(2);
//     document.getElementById("shipping").textContent = shipping.toFixed(2);
//     document.getElementById("tax").textContent = tax.toFixed(2);
//     document.getElementById("orderTotal").textContent = total.toFixed(2);
//   }

//   async checkout(form) {
//     const cartItems = getLocalStorage("so-cart");
//     const items = cartItems.map(item => ({
//       id: item.Id,
//       name: item.Name,
//       price: item.FinalPrice,
//       quantity: 1
//     }));

//     const orderData = {
//       orderDate: new Date().toISOString(),
//       fname: form.elements["fname"].value,
//       lname: form.elements["lname"].value,
//       street: form.elements["street"].value,
//       city: form.elements["city"].value,
//       state: form.elements["state"].value,
//       zip: form.elements["zip"].value,
//       cardNumber: form.elements["cardNumber"].value,
//       expiration: form.elements["expiration"].value,
//       code: form.elements["code"].value,
//       items: items,
//       orderTotal: document.getElementById("orderTotal").textContent,
//       shipping: document.getElementById("shipping").textContent,
//       tax: document.getElementById("tax").textContent
//     };

//     const services = new ExternalServices();
//     try {
//       const response = await services.checkout(orderData);
//       // handle success response, e.g., redirect to a success page
//     } catch (error) {
//       console.error("Checkout failed", error);
//     }
//   }
// }


import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { alertMessage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor() {
    this.shippingRate = 10;
    this.taxRate = 0.06;
  }

  calculateItemSubtotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.FinalPrice, 0);
  }

  calculateShipping(cartItems) {
    if (cartItems.length === 0) return 0;
    return this.shippingRate + (cartItems.length - 1) * 2;
  }

  calculateTax(subtotal) {
    return subtotal * this.taxRate;
  }

  calculateTotal(subtotal, shipping, tax) {
    return subtotal + shipping + tax;
  }

  displayOrderSummary(cartItems) {
    const subtotal = this.calculateItemSubtotal(cartItems);
    const shipping = this.calculateShipping(cartItems);
    const tax = this.calculateTax(subtotal);
    const total = this.calculateTotal(subtotal, shipping, tax);

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
      quantity: 1
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
