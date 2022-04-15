import axios from 'axios';

export const fetchCat = () => {
  const tags = [];
  return axios
    .get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((res) => {
      res.data.meals.forEach((item) => tags.push(item.strCategory));

      return {
        tags,
        type: 'Category',
        active: tags[0],
      };
    });
};
export const fetchArea = () => {
  const tags = [];
  return axios
    .get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((res) => {
      res.data.meals.forEach((item) => tags.push(item.strArea));
      return {
        tags,
        type: 'Area',
        active: tags[0],
      };
    });
};
export const fetchIngredients = () => {
  const usedIndex = [];
  const tags = [];
  return axios
    .get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((res) => {
      for (let i = 0; i < 20; i++) {
        // randomize the tags that are being returned
        let tagIndex = Math.round(Math.random() * res.data.meals.length - 1);
        while (usedIndex.includes(tagIndex)) {
          tagIndex = Math.round(Math.random() * res.data.meals.length - 1);
        }
        usedIndex.push(tagIndex);
        tags.push(res.data.meals[tagIndex].strIngredient);
      }
      return {
        tags,
        type: 'Ingredients',
        active: tags[0],
      };
    });
};
