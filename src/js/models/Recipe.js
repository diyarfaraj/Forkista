import axios from "axios";
import { key, AppId } from "../config";
import { compileFunction } from "vm";
import { type } from "os";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`
      );

      // show title
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
      alert("something went wrong in getRecipe() in Recipe.js: " + error);
    }
  }

  calcTime() {
    // Assuming that we need 15 mins for each 3 three ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  //Replace and unify each ingredients units to short simple units
  parseIngredients() {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds"
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound"
    ];
    const units = [...unitsShort, "kg", "g"];
    const newIngredients = this.ingredients.map(el => {
      //1. uniform Units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });
      //2. remove parenthesis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      //3. pars ingredients into count, unit and ingredient
      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

      let objIng;
      if (unitIndex > -1) {
        //there is a unit
        //EX. 3 1/2 cups, arrCount is [3, 1/2] --> eval("3 + 1/2") = 3.5 cups
        //EX 3 cups, arrCount is [4]
        const arrCount = arrIng.slice(0, unitIndex);
        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace("-", "+"));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join("+"));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(" ")
        };
      } else if (parseInt(arrIng[0], 10)) {
        // there is not unit, but the first element is a number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: "",
          ingredient: arrIng.slice(1).join(" ")
        };
      } else if (unitIndex === -1) {
        //there is no unit and no number in the first element
        objIng = {
          count: 1,
          unit: "",
          ingredient
        };
      }

      return objIng;
    });

    this.ingredients = newIngredients;
  }

  // Update the servings
  updateServings(type) {
    //servings
    const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;
    //Ingredients
    this.ingredients.forEach(ing => {
      ing.count *= newServings / this.servings;
    });

    this.servings = newServings;
  }
}