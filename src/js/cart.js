export function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  export function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  export function getCartItemCount(cart) {
    return cart.length;
  }
  
  export function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    const cart = getCartFromLocalStorage();
    const itemCount = getCartItemCount(cart);
    cartCounter.textContent = itemCount;
  }
  
  export function addItemToCart(item) {
    const cart = getCartFromLocalStorage();
    cart.push(item);
    saveCartToLocalStorage(cart);
    console.log(`Added item: ${item}`);
    console.log(`Current cart: ${cart}`);
    updateCartCounter();
  }
  
  export function removeItemFromCart(item) {
    const cart = getCartFromLocalStorage();
    const index = cart.indexOf(item);
    if (index > -1) {
      cart.splice(index, 1);
      saveCartToLocalStorage(cart);
      console.log(`Removed item: ${item}`);
      console.log(`Current cart: ${cart}`);
    }
    updateCartCounter();
  }
  
  export function setupCart() {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (event) => {
          event.preventDefault();  // Prevent default link behavior
          const item = card.getAttribute('data-item-id');
          addItemToCart(item);
        });
      });
  
      updateCartCounter();
    });
  }
  