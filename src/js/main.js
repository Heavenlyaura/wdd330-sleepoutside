import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { setupCart } from "./cart.js";
import Alert from "./alert.js";

loadHeaderFooter();

const productList = document.querySelector(".product-list");
let productData = new ProductData("tents");
let productListing = new ProductList("tents", productData, productList);

productListing.init();

// Setup cart functionality
setupCart();

document.addEventListener('DOMContentLoaded', () => {
  const alert = new Alert();
  alert.fetchAlerts();
});
