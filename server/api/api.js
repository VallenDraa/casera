const User = require('../model/User');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // get datas from the body
    const newUser = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    // find existing user
    User.findOne({
      $or: [
        {
          email: newUser.email,
        },
        {
          username: newUser.username,
        },
      ],
    })
      .then((existingUser) => {
        //   if there is no existing user
        !existingUser
          ? newUser
              .save()
              .then(() => res.status(200).json({ ok: true, signup: true }))
              .catch(() => res.status(500).json({ ok: false, signup: false }))
          : res.status(409).json({ ok: false, signup: false });
      })
      .catch(() => res.status(500).json({ ok: false, signup: false }));
  } catch (e) {
    res.status(500).json({ ok: false, signup: false });
  }
};

const login = async (req, res) => {
  const { username, loginPassword } = req.body;
  try {
    //   check if there is a user with the same name as the requested one
    const user = await User.findOne({ username });
    if (user) {
      const { password, ...userData } = user._doc;
      // check if password is correct
      (await bcrypt.compare(loginPassword, user.password))
        ? res.status(200).json({ ok: true, login: true, userData })
        : res.status(401).json({ ok: false, login: false });
    } else {
      // if there are no users with the same name as the requested one
      res.status(404).json({ ok: false, login: false });
    }
  } catch (e) {
    //   server error
    res.status(505).json({ ok: false, login: false });
  }
};

const saveRecipe = async (req, res) => {
  const { _id, idMeal } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user.savedRecipes.includes(idMeal)) {
      user.savedRecipes.push(idMeal);
      user
        .save()
        .then(() => res.status(200).json({ ok: true, recipeSaved: true }))
        .catch(() => res.status(500).json({ ok: false, recipeSaved: false }));
    } else {
      res.status(409).json({ ok: true, recipeSaved: false });
    }
  } catch (e) {
    res.status(500).json({ ok: false, recipeSaved: false });
  }
};

const getSavedRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    const { username, savedRecipes } = user._doc;
    res.status(200).json({ ok: true, getRecipe: true, username, savedRecipes });
  } catch (err) {
    res.status(500).json({ ok: false, getRecipe: false });
  }
};

const removeSavedRecipe = async (req, res) => {
  const { _id, idMeal } = req.body;
  try {
    const user = await User.findById(_id);
    const { username } = user._doc;

    if (user.savedRecipes.includes(idMeal)) {
      user.savedRecipes = user.savedRecipes.filter(
        (recipeID) => recipeID !== idMeal
      );
      user
        .save()
        .then(() =>
          res.status(200).json({
            ok: true,
            removeRecipe: true,
            username,
            savedRecipes: user.savedRecipes,
          })
        )
        .catch(() => res.status(500).json({ ok: false, removeRecipe: false }));
    } else {
      res.status(404).json({ ok: true, removeRecipe: false });
    }
  } catch (err) {
    res.status(500).json({ ok: false, removeRecipe: false });
  }
};

module.exports = {
  signUp,
  login,
  saveRecipe,
  getSavedRecipes,
  removeSavedRecipe,
};
