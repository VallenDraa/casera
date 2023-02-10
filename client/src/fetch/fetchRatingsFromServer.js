import api from "./apiAxios";

export const fetchTotalRating = async (idMeals) => {
  const query = typeof idMeals === "object" ? idMeals.join(",") : idMeals; // ==> array is object apparently in JS

  try {
    const { data } = await api.get(`/api/rating/get?idMeals=${query}`);
    return data;
  } catch (err) {
    throw Error(err);
  }
};

export const addRating = async (newUserRating, userState, idMeal) => {
  const { username } = userState;
  const bodyContent = { idMeal, username, newUserRating };
  try {
    const { data } = await api.post("/api/rating/add", bodyContent);
    return data;
  } catch (err) {
    throw Error(err);
  }
};

export const updateRating = async (newUserRating, userState, idMeal) => {
  const { username } = userState;
  const bodyContent = { idMeal, username, newUserRating };
  try {
    const { data } = await api.put("/api/rating/update", bodyContent);
    if (data.updateRating) {
      return data;
    } else {
      throw Error("Fail To Make Connection");
    }
  } catch (err) {
    throw Error(err);
  }
};
