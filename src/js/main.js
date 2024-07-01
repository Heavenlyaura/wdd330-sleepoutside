import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

const productList = document.querySelector(".product-list");
let productData = new ProductData("tents");
let productListing = new ProductList("tents", productData, productList);

productListing.init();
