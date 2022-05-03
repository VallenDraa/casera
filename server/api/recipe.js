const User = require('../model/User');
const axios = require('axios').default;

// recipe related api

const isSaved = async (req, res) => {
  const { username, idMeal } = req.query;

  // return if there is no username of id meal
  if (!username || !idMeal) return;

  try {
    const user = await User.findOne({ username });
    const containIdMeal = user.savedRecipes.includes(idMeal);

    res.status(200).json({ ok: true, code: 200, containIdMeal, idMeal });
  } catch (e) {
    res.status(500).json({ ok: false, code: 500, e });
  }
};

const getSavedRecipes = async (req, res) => {
  const { _id, preview } = req.query;

  // console.log(req.query);
  try {
    const user = await User.findById(_id);
    const { username, savedRecipes } = user;

    // get recipes from mealdb
    fetchFromMealDB(savedRecipes, preview)
      .then((savedRecipes) => {
        res.status(200).json({
          code: 200,
          ok: true,
          getRecipe: true,
          username,
          savedRecipes,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ code: 500, ok: false, getRecipe: false });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, ok: false, getRecipe: false });
  }
};

const saveRecipe = async (req, res) => {
  const { _id, idMeal } = req.body;

  try {
    const user = await User.findById(_id);

    // check if user haven't save the recipe
    if (!user.savedRecipes.includes(idMeal)) {
      user.savedRecipes.push(idMeal);
      user
        .save()
        .then(() =>
          res.status(200).json({
            code: 200,
            ok: true,
            recipeSaved: true,
            currentSavedRecipes: user.savedRecipes,
          })
        )
        .catch(() =>
          res.status(500).json({ code: 500, ok: false, recipeSaved: false })
        );
    } else {
      res.json({
        code: 409,
        ok: false,
        recipeSaved: false,
        msg: 'You Already Save This Recipe',
      });
    }
  } catch (e) {
    res.status(500).json({ code: 500, ok: false, recipeSaved: false });
  }
};

const removeSavedRecipe = async (req, res) => {
  // console.log(req.body);
  const { _id, idMeal } = req.body;
  try {
    const user = await User.findById(_id);
    const { username } = user._doc;

    // check if user saved the recipe
    if (user.savedRecipes.includes(idMeal)) {
      user.savedRecipes = user.savedRecipes.filter(
        (recipeID) => recipeID !== Number(idMeal)
      );

      user
        .save()
        .then(() =>
          res.status(200).json({
            code: 200,
            ok: true,
            recipeRemoved: true,
            username,
            currentSavedRecipes: user.savedRecipes,
          })
        )
        .catch(() =>
          res.status(500).json({ code: 500, ok: false, recipeRemoved: false })
        );
    } else {
      res.status(404).json({
        code: 404,
        ok: true,
        recipeRemoved: false,
        msg: "User Hasn't Save This Recipe",
      });
    }
  } catch (err) {
    res.status(500).json({ code: 500, ok: false, recipeRemoved: false });
  }
};

// getSavedRecipes supporting function
const fetchFromMealDB = async (ids, preview) => {
  const result = [];

  for (let i = 0; i < ids.length; i++) {
    // return if index is more than 4
    if (preview === 'true') {
      if (i > 5) return result;
    }

    try {
      const { data } = await axios({
        method: 'GET',
        url: `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids[i]}`,
        responseType: 'json',
      });

      const { strMeal, idMeal, strMealThumb } = data.meals[0];
      result.push({ strMeal, idMeal, strMealThumb });
    } catch (e) {
      return e;
    }
  }
  return result;
};

module.exports = {
  saveRecipe,
  getSavedRecipes,
  removeSavedRecipe,
  isSaved,
};
