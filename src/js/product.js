import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let currentCart = getLocalStorage("so-cart");

  if (!currentCart || !Array.isArray(currentCart)) {
    currentCart = [];
  }
  

  currentCart.push(product);
  setLocalStorage("so-cart", currentCart);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
