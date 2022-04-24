const express = require('express');
const router = express.Router();
const {
  saveRecipe,
  getSavedRecipes,
  removeSavedRecipe,
  isSaved,
} = require('../api/recipe');

// recipe
router.put('/recipe/save', saveRecipe);
router.get('/recipe/gets', getSavedRecipes);
router.get('/recipe/is_saved', isSaved);
router.delete('/recipe/remove', removeSavedRecipe);

module.exports = router;
