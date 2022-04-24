const User = require('../model/User');

// recipe related api
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
          res.status(200).json({ code: 200, ok: true, recipeSaved: true })
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

const isSaved = async (req, res) => {
  const { username, idMeal } = req.query;

  // return if there is no username of id meal
  if (!username || !idMeal) return;

  try {
    const user = await User.findOne({ username });
    const containIdMeal = user.savedRecipes.includes(idMeal);

    res.status(200).json({ ok: true, code: 200, containIdMeal, idMeal });
  } catch (e) {
    res.status(500).json({ ok: false, code: 500 });
  }
};

const getSavedRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.query._id);
    const { username, savedRecipes } = user;
    res
      .status(200)
      .json({ code: 200, ok: true, getRecipe: true, username, savedRecipes });
  } catch (err) {
    res.status(500).json({ code: 500, ok: false, getRecipe: false });
  }
};

const removeSavedRecipe = async (req, res) => {
  const { _id, idMeal } = req.body;
  try {
    const user = await User.findById(_id);
    const { username } = user._doc;

    // check if user saved the recipe
    if (user.savedRecipes.includes(idMeal)) {
      user.savedRecipes = user.savedRecipes.filter(
        (recipeID) => recipeID !== idMeal
      );
      user
        .save()
        .then(() =>
          res.status(200).json({
            code: 200,
            ok: true,
            removeRecipe: true,
            username,
            savedRecipes: user.savedRecipes,
          })
        )
        .catch(() =>
          res.status(500).json({ code: 500, ok: false, removeRecipe: false })
        );
    } else {
      res.status(404).json({
        code: 404,
        ok: true,
        removeRecipe: false,
        msg: "User Hasn't Save This Recipe",
      });
    }
  } catch (err) {
    res.status(500).json({ code: 500, ok: false, removeRecipe: false });
  }
};

module.exports = {
  saveRecipe,
  getSavedRecipes,
  removeSavedRecipe,
  isSaved,
};
