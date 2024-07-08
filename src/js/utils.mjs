
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}


export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}


export function getParam(params) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(params)
  return product;
}

// export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
//   if (clear) {
//     parentElement.innerHTML = "";
//   }
//   const htmlStrings = list.map(templateFn);
//   parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
// }

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function loadTemplate(path) {
  const html = await fetch(path);
  const response = await html.text()
  const template = document.createElement('template');
  template.innerHTML = response;
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template.innerHTML);

  if (callback) {
    callback(data);
  }
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `
    <p>${message}</p>
    <span class="close-alert">X</span>
  `;
  alert.querySelector('.close-alert').addEventListener('click', () => {
    alert.remove();
  });
  const main = document.querySelector('main');
  main.prepend(alert);
  if (scroll) window.scrollTo(0, 0);
}


export function calculateItemSubtotal(cartItems) {
  return cartItems.reduce((total, item) => total + (item.FinalPrice * item.quantity), 0);
}

export function calculateShipping(cartItems, shippingRate = 10) {
  if (cartItems.length === 0) return 0;
  return shippingRate + (cartItems.length - 1) * 2;
}

export function calculateTax(subtotal, taxRate = 0.06) {
  return subtotal * taxRate;
}

export function calculateTotal(subtotal, shipping, tax) {
  return subtotal + shipping + tax;
}
