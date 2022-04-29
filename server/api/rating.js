const axios = require('axios').default;
const Rating = require('../model/Rating');
const User = require('../model/User');

const getRating = (req, res) => {};

const addToRating = async (req, res) => {
  const { idMeal, username, newUserRating } = req.body;
  console.log(req.body);
  try {
    //   find existing rating
    const existingMealRating = await Rating.findById(idMeal);
    const user = await User.findOne({ username });

    // check if the rating with the current meal id exist
    if (!existingMealRating) {
      // create new instance of Rating with the inputted data, then save
      const newMealRating = new Rating({
        _id: idMeal,
        totalRating: newUserRating,
        byWho: [
          {
            username,
            newUserRating,
          },
        ],
      });
      await newMealRating.save();

      //   push the idMeal to the ratingsByUser array, then save
      user.ratingsByUser.push({ idMeal, newUserRating });
      await user.save();
      res.json({ foo: 'bar' });
    }
    // rating with the current meal id exists
    else {
      // destructure all individual ratings by user
      const [...{ rating }] = existingMealRating.byWho;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, ok: false });
  }
};

const removeRating = (req, res) => {};

const updateRating = (req, res) => {};

module.exports = {
  getRating,
  addToRating,
  removeRating,
  updateRating,
};
