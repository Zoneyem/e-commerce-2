const API = {
  url: "https://dummyjson.com/products",
  fetchMenu: async () => {
    try {
      const result = await fetch(API.url);
      //we store the products in the localstorage
      localStorage.setItem("products", JSON.stringify(await result.json()));
      return await result.json();
    } catch (error) {
      //we  check the localstorage to see if there are products store there
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        return JSON.parse(storedProducts);
      }
      console.error("Error fetching menu:", error);
      return null;
    } finally {
      console.log("fetching menu completed");
    }
  },
};

export default API;
