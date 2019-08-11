import axios from "axios";

//687a5859aeb66b8932974dabdd48036e
//https://www.food2fork.com/api/search

async function getResults(query) {
  const key = "687a5859aeb66b8932974dabdd48036e";

  try {
    const res = await axios(
      `https://www.food2fork.com/api/search?key=${key}&q=${query}`
    );
    const recipes = res.data.recipes;
    console.log(recipes);
  } catch (error) {
    alert(error);
  }
}

getResults("chicken");
