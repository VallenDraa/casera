const User = require('../model/User');

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

const getSavedRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    const { username, savedRecipes } = user._doc;
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
};
