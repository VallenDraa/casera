import axios from 'axios';
import { removeDupeObjInArrayByKey } from '../utils/utils';

export default async function fetchSearchResult(query) {
  const recipes = [];
  const searchRes = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const ingredientRes = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
  );
  const catRes = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`
  );
  const areaRes = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`
  );

  insertItem(searchRes.data.meals, recipes);
  insertItem(ingredientRes.data.meals, recipes);
  insertItem(catRes.data.meals, recipes);
  insertItem(areaRes.data.meals, recipes);

  // filter duplicate data
  const finalRecipes = removeDupeObjInArrayByKey(recipes, 'strMeal');
  return finalRecipes;

  function insertItem(items, targetArray) {
    if (!items) return;

    for (const item of items) {
      const data = {
        idMeal: item.idMeal,
        strMeal: item.strMeal,
        strMealThumb: item.strMealThumb,
      };

      targetArray.push(data);
    }
  }
}
