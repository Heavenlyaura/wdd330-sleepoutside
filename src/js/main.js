import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

const productList = document.querySelector(".product-list");
let externalServices = new ExternalServices("tents");
let productListing = new ProductList("tents", externalServices, productList);

productListing.init();
