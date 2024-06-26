import ProductData from "./ProductData.mjs";
import ProductListing from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter()


const productList = document.querySelector(".product-list");
let productData = new ProductData("tents");
let productListing = new ProductListing("tents", productData, productList);

productListing.init();
