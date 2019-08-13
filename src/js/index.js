import Search from "./models/Search";
import { elements, renderLoader, clearLoader } from "./views/base";
import * as searhcView from "./views/searchView";
import { basename } from "path";
// Global state of the app
// - Search object
// - current recipe object
// - SHopping list object
//- Liked object

const state = {};

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
