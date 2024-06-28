import ProductData from "./ProductData.mjs";
import ProductListing from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
loadHeaderFooter();

const category = getParam("category");
const productList = document.querySelector(".product-list");
let productData = new ProductData();
let productListing = new ProductListing(category, productData, productList);

productListing.init();
