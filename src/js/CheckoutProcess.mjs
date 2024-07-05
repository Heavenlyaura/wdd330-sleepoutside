import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function calculateSubtotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.FinalPrice, 0);
}

function calculateShipping(cartItems) {
  return 10 + (cartItems.length - 1) * 2;
}

function calculateTax(subtotal) {
  return subtotal * 0.06;
}

function packageItems(items) {
  return items.map(item => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1
  }));
}

export default class CheckoutProcess {
  constructor() {
    this.cartItems = getLocalStorage("so-cart") || [];
    this.subtotal = calculateSubtotal(this.cartItems);
    this.shipping = calculateShipping(this.cartItems);
    this.tax = calculateTax(this.subtotal);
    this.orderTotal = this.subtotal + this.shipping + this.tax;
  }

  displayOrderSummary() {
    document.getElementById("subtotal").textContent = this.subtotal.toFixed(2);
    document.getElementById("shipping").textContent = this.shipping.toFixed(2);
    document.getElementById("tax").textContent = this.tax.toFixed(2);
    document.getElementById("orderTotal").textContent = this.orderTotal.toFixed(2);
  }

  async checkout(form) {
    const order = {
      orderDate: new Date().toISOString(),
      fname: form.fname.value,
      lname: form.lname.value,
      street: form.street.value,
      city: form.city.value,
      state: form.state.value,
      zip: form.zip.value,
      cardNumber: form.cardNumber.value,
      expiration: form.expiration.value,
      code: form.code.value,
      items: packageItems(this.cartItems),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping.toFixed(2),
      tax: this.tax.toFixed(2)
    };

    try {
      const response = await fetch('https://wdd330-backend.onrender.com/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });
      const data = await response.json();
      console.log(data);
      alert('Order placed successfully!');
      setLocalStorage("so-cart", []);
      window.location.href = '/';
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error processing your order. Please try again.');
    }
  }
}
