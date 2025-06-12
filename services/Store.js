//This will act as a global state for the application

const Store = {
  menu: null,
  cart: [],
  orders: [],
  products: [],
  addToCart: (product) => {
    Store.cart.push(product);
    // ajouter le localstorage ou session storage
    localStorage.setItem("cart", JSON.stringify(Store.cart));
  },
  removeFromCart: (product) => {
    Store.cart = Store.cart.filter((p) => p.id !== product.id);
  },
  getCart: () => {
    return Store.cart;
  },
  getOrders: () => {
    return Store.orders;
  },
  getProducts: () => {
    return Store.products;
  },
  getMenu: () => {
    return Store.menu;
  },
};

export default Store;
