import ShoppingCart from "./ShoppingCart.mjs";

const productList = document.querySelector(".product-list");
let shoppingCart = new ShoppingCart("so-cart", productList)
shoppingCart.renderCartContents()