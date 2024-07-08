import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

import Alert from './alert.js';

document.addEventListener('DOMContentLoaded', () => {
  new Alert();
});
