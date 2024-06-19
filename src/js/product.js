import { setLocalStorage, getLocalStorage, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs"


const dataSource = new ProductData("tents");
const productId = getParams("product");
const product = new ProductDetails(productId, dataSource);
product.init();

console.log(dataSource.findProductById(productId));

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
