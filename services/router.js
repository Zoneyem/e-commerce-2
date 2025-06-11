const Router = {
  init: () => {
    document.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();

        const url1 = event.target.getAttribute("href");
        const url2 = a.getAttribute("href");

        Router.go(url1);
        console.log("link Clicked");
      });
    });
    // Event Handler for Url Changes

    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });

    // check the initial url
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createEvent("h1");
        pageElement.textContent = "Menu";
        break;
      case "/order":
        pageElement = document.createEvent("h1");
        pageElement.textContent = "Your order";
        break;
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createEvent("h1");
          pageElement.textContent = "Details";
          const paramId = route.substring(route.lastIndexOf("-") + 1);
          pageElement.dataset.id = paramId;
        }
    }

    if (pageElement) {
      const cache = document.querySelector("main");
      cache.innerHTML = "";
      cache.appendChild(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    }
  },
};

export default Router;
