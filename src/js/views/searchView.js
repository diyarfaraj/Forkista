import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResList.innerHTML = "";
  elements.searchResPages.innerHTML = "";
};

export const highlightSelected = id => {
  const resultsArr = Array.from(document.querySelectorAll(".results__link"));

  resultsArr.forEach(el => {
    el.classList.remove("results__link--active");
  });
  document
    .querySelector(`a[href="#${id}"]`)
    .classList.add("results__link--active");
};

// Shorten the titles of search result
/*
search result: "Pasta with tomato and spinach". 
acc: 0 / acc + curr.lenth = 5 / newTitle = ['pasta']
acc: 5 / acc + curr.lenth = 9 / newTitle = ['pasta', 'with']
acc: 9 / acc + curr.lenth = 15 / newTitle = ['pasta', 'with', 'tomato']
(now it's bigger than limit=17)
!acc: 15 / acc + curr.lenth = 18 / newTitle = ['pasta', 'with', 'tomato']
!acc: 18 / acc + curr.lenth = 24 / newTitle = ['pasta', 'with', 'tomato']
*/
const limitRecipeTitle = (title, recipe, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    //return the result
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};

const renderRecipe = recipe => {
  const markup = `
    <li>
                    <a class="results__link " href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${
    recipe.title
  }">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(
                              recipe.title
                            )}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;

  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

//create buttons
const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>  <span>Page ${type === "prev" ? page - 1 : page + 1}</span>


  <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${
        type === "prev" ? "left" : "right"
      }"></use>
  </svg>
</button>

`;

//Paginations buttons
const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;
  if (page === 1 && pages > 1) {
    //Only Button to go to next page
    button = createButton(page, "next");
  } else if (page < pages) {
    // Both buttons to show
    button = `${(button = createButton(page, "next"))}
    ${(button = createButton(page, "prev"))}`;
  } else if (page === pages && pages > 1) {
    //Only Button to go to previous page
    button = createButton(page, "prev");
  }

  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResult = (recipes, page = 1, resPerPage = 10) => {
  //render results of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  // render pagination buttons
  renderButtons(page, recipes.length, resPerPage);
};
