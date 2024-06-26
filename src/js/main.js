import ProductData from "./ProductData.mjs";
import ProductListing from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

const productList = document.querySelector(".product-list");
let productData = new ProductData("tents");
let productListing = new ProductListing("tents", productData, productList);

productListing.init();


document.addEventListener('DOMContentLoaded', () => {
  const cartCounter = document.getElementById('cart-counter');
  let cart = [];

  function getCartItemCount() {
    return cart.length;
  }

  function updateCartCounter() {
    const itemCount = getCartItemCount();
    cartCounter.textContent = itemCount;
  }

  function addItemToCart(item) {
    cart.push(item);
    console.log(`Added item: ${item}`); 
    console.log(`Current cart: ${cart}`); 
    updateCartCounter();
  }

  function removeItemFromCart(item) {
    const index = cart.indexOf(item);
    if (index > -1) {
      cart.splice(index, 1);
      console.log(`Removed item: ${item}`);
      console.log(`Current cart: ${cart}`); 
    }
    updateCartCounter(); 
  }

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (event) => {
      event.preventDefault();  // Prevent default link behavior
      const item = card.getAttribute('data-item-id');
      addItemToCart(item);
    });
  });

  updateCartCounter();
});
