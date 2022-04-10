import axios from 'axios';

export const fetchCat = () => {
  return axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
};
export const fetchArea = () => {
  return axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
};
export const fetchIngredients = () => {
  return axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
};
