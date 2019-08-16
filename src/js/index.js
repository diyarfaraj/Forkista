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

    //4 Search for recipes
    await state.search.getResults();

    //5 render result on UI
    clearLoader();
    searhcView.renderResult(state.search.result);
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

const r = new Recipe(47746);
r.getRecipe();

console.log(r);
