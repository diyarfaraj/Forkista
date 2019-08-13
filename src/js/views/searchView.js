import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResList.innerHTML = "";
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

export const renderResult = recipes => {
  recipes.forEach(renderRecipe);
};
