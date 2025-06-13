///// new JS Code

import Store from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/menu.js";
import Router from "./services/router.js";

window.app = {};
app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", () => {
  loadData();
  app.router.init();

  // --- Cart Functionality ---

  function updateCartUI() {
    const cartCount = document.getElementById("cartCount");
    if (cartCount) {
      cartCount.textContent = app.store.cart.length;
    }
  }

  function addToCartById(id) {
    if (!app.store.menu || !app.store.menu.products) {
      console.error("Menu data not loaded yet.");
      return;
    }
    const product = app.store.menu.products.find((p) => p.id == id);
    if (product) {
      app.store.addToCart(product);
      updateCartUI();
    } else {
      console.error(`Product with id ${id} not found.`);
    }
  }

  // Load cart from local storage
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    try {
      const cart = JSON.parse(cartData);
      if (Array.isArray(cart)) {
        app.store.cart = cart;
      }
    } catch (e) {
      console.error("Error parsing cart from localStorage", e);
      app.store.cart = [];
    }
  }
  updateCartUI();

  // Event delegation for Add to Cart buttons
  document.addEventListener("click", (event) => {
    const addToCartButton = event.target.closest(
      ".product-card__button, .product-details__add-to-cart"
    );
    if (addToCartButton) {
      const productId = addToCartButton.dataset.productId;
      if (productId) {
        addToCartById(productId);
      }
    }
  });
});

///////////////////////////New Navbar///////////////////////////////////////

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
