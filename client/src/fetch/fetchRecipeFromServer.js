import axios from 'axios';

// fetch the saved recipes from the database
export const fetchSavedRecipes = async (
  userState,
  setToastData,
  preview = false
) => {
  // returns if there is userState is empty
  if (!userState) return;

  const { _id } = userState;

  try {
    const { data } = await axios.get(
      `/api/recipe/gets?_id=${_id}&preview=${preview}`
    );
    if (data.savedRecipes.length === 0) return;
    return data.savedRecipes;
  } catch (e) {
    setToastData({ ok: false, msg: 'Fail To Make Connection !' });
  }
};

export const isSaved = async (
  setToastData,
  userState,
  idMeal,
  setSaveBtn,
  SaveRecipeBtn,
  big = false
) => {
  setToastData(null);
  if (userState) {
    try {
      const { data } = await axios.get(
        `/api/recipe/is_saved?username=${userState.username}&idMeal=${idMeal}`
      );

      big
        ? setSaveBtn(
            <SaveRecipeBtn
              idMeal={idMeal}
              initSaved={data.containIdMeal}
              big={big}
            />
          )
        : setSaveBtn(
            <SaveRecipeBtn idMeal={idMeal} initSaved={data.containIdMeal} />
          );
    } catch (error) {
      setToastData({ ok: false, msg: 'Fail To Make Connection !' });
    }
  } else {
    big
      ? setSaveBtn(<SaveRecipeBtn idMeal={idMeal} big={big} />)
      : setSaveBtn(<SaveRecipeBtn idMeal={idMeal} />);
  }
};

export const recipeSave = (setToastData, setSaved, bodyContent) => {
  setSaved(true);
  axios
    .put('/api/recipe/save', bodyContent)
    .then(({ data }) => {
      const { recipeSaved, msg } = data;

      recipeSaved || setToastData({ ok: false, msg });
    })
    .catch(() => {
      setToastData({ ok: false, msg: 'Fail To Make Connection !' });
    });
};

export const recipeUnsave = (setToastData, setSaved, bodyContent) => {
  setSaved(false);
  axios
    .delete('/api/recipe/remove', { data: bodyContent })
    .then(({ data }) => {
      const { recipeRemoved, msg } = data;

      recipeRemoved || setToastData({ ok: false, msg });
    })
    .catch((e) => {
      console.log(e);
      setToastData({ ok: false, msg: 'Fail To Make Connection !' });
    });
};
