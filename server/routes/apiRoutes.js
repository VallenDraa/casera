const express = require('express');
const router = express.Router();
const {
  saveRecipe,
  getSavedRecipes,
  removeSavedRecipe,
} = require('../api/api');

// allow json
router.use(express.json());

// recipe
router.put('/recipe/save', saveRecipe);
router.get('/recipe/get_saved_recipes', getSavedRecipes);
router.delete('/recipe/remove_saved_recipe', removeSavedRecipe);

module.exports = router;
