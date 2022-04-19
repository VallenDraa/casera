const express = require('express');
const router = express.Router();
const {
  register,
  login,
  saveRecipe,
  getSavedRecipes,
  removeSavedRecipe,
} = require('../api/api');

// allow json
router.use(express.json());

// user auth
router.post('/register', register);
router.get('/login', login);

// recipe
router.put('/recipe/save', saveRecipe);
router.get('/recipe/get_saved_recipes', getSavedRecipes);
router.delete('/recipe/remove_saved_recipe', removeSavedRecipe);

module.exports = router;
