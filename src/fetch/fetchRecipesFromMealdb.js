import axios from 'axios';

export const fetchRecipesByTypes = (types, tag) => {
  const usedIndex = [];
  const recipes = [];
  let meals, query;
  //   changing the query string according to the types parameter
  switch (types) {
    case 'Categories':
      query = `c=${tag}`;
      // console.log(query);
      break;
    case 'Area':
      query = `a=${tag}`;
      // console.log(query);
      break;
    case 'Ingredients':
      query = `i=${tag}`;
      // console.log(query);
      break;
    default:
      query = `c=${tag}`;
      // console.log(query);
      break;
  }

  //   fetching from the api
  return axios
    .get(`https://www.themealdb.com/api/json/v1/1/filter.php?${query}`)
    .then(async (res) => {
      meals = res.data.meals;

      //   if meals array length is <= 15, then just return the whole data
      if (!meals) return;
      if (meals.length <= 15) {
        return meals;
      }

      //   assigning the recipe into the recipes array and returning the picked recipes
      for (let i = 0; i < 15; i++) {
        // randomize the tags that are being returned
        let tagIndex = Math.round(Math.random() * meals.length - 1);
        while (usedIndex.includes(tagIndex)) {
          tagIndex = Math.round(Math.random() * meals.length - 1);
        }
        // pushing the generated tag index to the usedIndex so that it won't be generated again
        usedIndex.push(tagIndex);
        recipes.push(meals[tagIndex]);
      }
      return recipes;
    })
    .catch(() => {
      return {
        error: true,
      };
    });
};
