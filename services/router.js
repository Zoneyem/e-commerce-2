const Router = {
  init: () => {
    // Handle our specific hash-based links
    document.addEventListener("click", (event) => {
      const anchor = event.target.closest("a");
      // Only handle links that are for our router
      if (anchor && anchor.getAttribute("href")?.startsWith("#/")) {
        event.preventDefault();
        const url = anchor.getAttribute("href");
        Router.go(url);
      }
    });

    // Event Handler for URL hash changes (back/forward buttons)
    window.addEventListener("hashchange", () => {
      Router.go(location.hash, false);
    });

    // Check the initial URL
    if (location.hash) {
      Router.go(location.hash);
    } else {
      Router.go("#/");
    }
  },

  go: (route, addToHistory = true) => {
    console.log("Navigating to:", route);

    if (addToHistory) {
      location.hash = route;
    }

    let pageElement = null;

    // Parse the route from the hash
    let path = route.startsWith("#/") ? route.substring(2) : ""; // e.g., from "#/product-4" to "product-4"

    if (path === "") {
      // This is our homepage
      pageElement = document.createElement("div");
      pageElement.className = "products-page";

      const products = JSON.parse(localStorage.getItem("products"));

      if (products?.products?.length) {
        const productsHTML = products.products
          .map(
            (product) => `
          <div class="product-card">
            <img src="${product.thumbnail}" alt="${
              product.title
            }" class="product-card__image">
            <div class="product-card__details">
              <h2 class="product-card__title">${product.title}</h2>
              <p class="product-card__description">${product.description.substring(
                0,
                100
              )}...</p>
              <p class="product-card__price">$${product.price}</p>
              <div class="product-card__actions">
                <a href="#/product-${
                  product.id
                }" class="product-card__view">View Details</a>
                <button class="product-card__button" data-product-id="${
                  product.id
                }">Add to Cart</button>
              </div>
            </div>
          </div>
        `
          )
          .join("");

        pageElement.innerHTML = `
          <h1>Our Products</h1>
          <div class="cards-container">
            ${productsHTML}
          </div>
        `;
      } else {
        pageElement.innerHTML = `
          <h1>Our Products</h1>
          <p>No products available at the moment.</p>
        `;
      }
    } else if (path === "order") {
      pageElement = document.createElement("h1");
      pageElement.textContent = "Your order";
    } else if (path.startsWith("product-")) {
     
      const paramId = path.substring(path.lastIndexOf("-") + 1);
      pageElement = document.createElement("div");
      pageElement.className = "product-details";

      const productData = JSON.parse(localStorage.getItem("products"));
      const product = productData?.products?.find(
        (p) => p.id === parseInt(paramId)
      );

      if (product) {
        pageElement.innerHTML = `
          <h1>${product.title}</h1>
          <div class="product-details__content">
            <img src="${product.thumbnail}" alt="${product.title}" class="product-details__image">
            <div class="product-details__info">
              <p class="product-details__description">${product.description}</p>
              <p class="product-details__price">$${product.price}</p>
              <button class="product-details__add-to-cart" data-product-id="${product.id}">
                Add to Cart
              </button>
            </div>
          </div>
        `;
      } else {
        pageElement.innerHTML = "<h1>Product Not Found</h1>";
      }
    } else {
      // Handle 404 for unknown hashes
      pageElement = document.createElement("div");
      pageElement.innerHTML = "<h1>Page Not Found</h1>";
    }

    if (pageElement) {
      const cache = document.querySelector("main");
      if (cache) {
        cache.innerHTML = "";
        cache.appendChild(pageElement);
        window.scrollTo(0, 0);
      }
    }
  },
};

export default Router;
