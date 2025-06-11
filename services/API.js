const API = {
  url: "https://dummyjson.com/products",
  fetchMenu: async () => {
      const result = await fetch(API.url);
    return  await result.json()
  },
};


export default API