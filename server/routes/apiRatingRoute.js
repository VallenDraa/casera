const express = require('express');
const router = express.Router();
const {
  getRating,
  addToRating,
  removeRating,
  updateRating,
} = require('../api/rating');

router.get('/rating/get', getRating);
router.post('/rating/add', addToRating);
router.delete('/rating/remove', removeRating);
router.put('/rating/update', updateRating);

module.exports = router;
