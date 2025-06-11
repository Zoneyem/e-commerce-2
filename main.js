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
});

window.addEventListener("load", getData());
const button = document.querySelector(".me");

const displayedProduct = document.querySelector(".displayed_product");

let mainCount = document.querySelector(".count");
let data = [];
let nav = document.querySelector(".nav-list-elements");
let productsContainer = document.querySelector(".cards-container");

// function to get my Data
async function getData() {
  const url = "https://dummyjson.com/products";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const { products } = await response.json();
    // update data with the fetched data
    data = products;
    console.log("inside", data);

    return products;
  } catch (error) {
    console.error(error.message);
  }
}

// always call this function to acess the data and work with it

getData().then((data) =>
  data.map(
    ({
      id,
      title,
      description,
      images,
      category,
      price,
      availabilityStatus,
      ...others
    }) => console.log(images[0], others)
  )
);

//button.addEventListener("click", logData);

console.log("testinggggggggggggg", data);

///// ONLY WORK WITH CATHEGORIES

getData().then((data) =>
  data.map(
    ({
      images,
      category,

      availabilityStatus,
      ...others
    }) => console.log("hello")
  )
);

let categories = [];

getData().then((data) => {
  data.forEach(
    ({
      images,
      category,

      availabilityStatus,
      ...others
    }) => {
      //////////NAVBAR IMPLEMENTATION

      categories.push(category);
      return (productsCategories = new Set(categories));
    }
  );

  productsCategories.forEach(
    (listElem) =>
      (nav.innerHTML += `<li class='nav-list-element'><a href="${listElem}">${listElem}</a> </li>`)
  );
});

/////////MAin Products List
getData().then((data) =>
  data.forEach(
    ({
      id,
      title,
      description,
      images,
      category,
      price,
      availabilityStatus,
      ...others
    }) => {
      const li = document.createElement("li");
      li.className = "card-item";
      li.innerHTML = `
       <li class="card-item">
         <div>
           <a href="/e-commerce/productPage.html/${id}">
             <div class='images-dev'><img width="100%" height="auto" src="${images[0]}" alt=""></div>
                <hr class="image-divider">
          <div class="cart-content">
       <p>${title}</p>
            <p>${others.brand}</p>
            <p>Price: <b>${price}</b></p>
           </div>
           </a>
           </div>
        </li>
         
     `;

      productsContainer.appendChild(li);
    }

    // li.addEventListener("click", ()=>function displayItem() {
    //    // console.log(data);
    //     displayedProduct.innerHTML += ` <p>${title}</p>
    //         <p>${others.brand}</p>
    //         <p>Price: <b>${price}</b></p>`;
    //   })
  )
);

mainCount.innerHTML = 0;

///////////////////////////New Navbar///////////////////////////////////////

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const cartCount = document.getElementById("cartCount");
let itemCount = 0; // Compteur d'articles

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Fonction pour ajouter un article au panier
function addToCart() {
  itemCount++; // Incrémenter le compteur
  cartCount.textContent = itemCount; // Mettre à jour le compteur affiché
}

// Exemple d'ajout d'articles via un appel à la fonction (à remplacer par votre logique d'ajout)
addToCart(); // Ajoute un article
addToCart(); // Ajoute un autre article
