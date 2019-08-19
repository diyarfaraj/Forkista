import Search from "./models/Search";
import Recipe from "./models/Recipe";
import { elements, renderLoader, clearLoader } from "./views/base";
import * as searhcView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import { basename } from "path";
import { stat } from "fs";
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
      alert("something wrong in the search Controll: " + error);
      //clearLoader();
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

  if (id) {
    //Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight Selected
    if (state.search) searhcView.highlightSelected(id);

    //Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      //calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      console.log(error);
      alert("Felmeddelande vid processandes av recipe på index.js: " + error);
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

// handlings recipe button clicks
elements.recipe.addEventListener("click", e => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    //decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    //increase button is clicked
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  }
});
