import Search from "./models/Search";
import Recipe from "./models/Recipe";
import { elements, renderLoader, clearLoader } from "./views/base";
import * as searhcView from "./views/searchView";
import { basename } from "path";
// Global state of the app
// - Search object
// - current recipe object
// - SHopping list object
//- Liked object

const state = {};

/* 

 -- SEARCH CONTROLLER --- 

*/

const controllSearch = async () => {
  //1. get the query from the view
  const query = searhcView.getInput();

  if (query) {
    // 2. new searhc object and add to state
    state.search = new Search(query);

    //3 prepare UI for results
    searhcView.clearInput();
    searhcView.clearResults();
    renderLoader(elements.searchRes);

    try {
      //4 Search for recipes
      await state.search.getResults();

      //5 render result on UI
      clearLoader();
      searhcView.renderResult(state.search.result);
    } catch (error) {
      alert("something wrong in the searchControll" + error);
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controllSearch();
});

elements.searchResPages.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searhcView.clearResults();
    searhcView.renderResult(state.search.result, goToPage);
  }
});

/* 

 -- RECIPE CONTROLLER --- 

*/
const controlRecipe = async () => {
  //Get the ID from the URL API
  const id = window.location.hash.replace("#", "");
  //console.log(id);

  if (id) {
    //Prepare UI for changes

    //Create new recipe object
    state.recipe = new Recipe(id);

    try {
      await state.recipe.getRecipe();
      //calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      //render recipe
      console.log(state.recipe);
    } catch (error) {
      alert("Felmeddelande vid processandes av recipe: " + error);
    }
    //Get recipe data
  }
};
/* window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);
 */

["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
