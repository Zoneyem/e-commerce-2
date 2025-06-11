import API from "./API.js";
import Router from "./router.js";

export async function loadData ()
{
    app.store.menu = await API.fetchMenu()
    app.router = Router
}