const axios = require('axios').default;
const Rating = require('../model/Rating');
const User = require('../model/User');

const getRating = async (req, res) => {
  const { idMeal } = req.query;
  try {
    const mealRatingData = await Rating.findById(Number(idMeal)).select(
      'totalRating'
    );

    res.status(200).json({ ok: true, getRating: true, mealRatingData });
  } catch (err) {
    res.status(500).json({ code: 500, ok: false, getRating: false });
  }
};

const addToRating = async (req, res) => {
  const { idMeal, username, newUserRating } = req.body;
  if (newUserRating > 5) {
    return res.json({
      code: 413,
      ok: false,
      updateRating: false,
      msg: 'The Rating Value Is Too Big !',
    });
  }
  try {
    //   find existing rating
    const existingMealRating = await Rating.findById(idMeal);
    const user = await User.findOne({ username });
    const newByWho = { _id: user._id, username, rating: newUserRating };

    // rating with the current meal id doesn't exist
    if (!existingMealRating) {
      // create new instance of Rating with the data input, then save
      const newMealRating = new Rating({
        _id: idMeal,
        totalRating: newUserRating,
        byWho: [newByWho],
      });
      await newMealRating.save();

      //   push the idMeal to the ratingsByUser array, then save
      user.ratingsByUser.push({ idMeal, rating: newUserRating });
      await user.save();

      // send back new ratingsByUser data to the client
      const { ratingsByUser } = user._doc;
      res.status(200).json({ ok: true, addToRating: true, ratingsByUser });
    }
    // rating with the current meal id exists
    else {
      // push a new rating by user
      existingMealRating.byWho.push(newByWho);
      const { byWho } = existingMealRating;

      // re-calculate total rating
      let newTotalRating = 0;
      for (const input of byWho) {
        newTotalRating = newTotalRating + input.rating;
      }
      newTotalRating = newTotalRating / byWho.length;

      // set the new total rating
      existingMealRating.totalRating = parseFloat(newTotalRating.toFixed(2));
      await existingMealRating.save();

      // push the idMeal to the ratingsByUser array, then save
      user.ratingsByUser.push({ idMeal, rating: newUserRating });
      await user.save();

      // send back new ratingsByUser data to the client
      const { ratingsByUser } = user._doc;
      res.status(200).json({ ok: true, addToRating: true, ratingsByUser });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ code: 500, ok: false, addToRating: false });
  }
};

const updateRating = async (req, res) => {
  const { idMeal, newUserRating, username } = req.body;
  if (newUserRating > 5) {
    return res.json({
      code: 413,
      ok: false,
      updateRating: false,
      msg: 'The Rating Value Is Too Big !',
    });
  }
  try {
    // find the user whose rating's will be updated
    const user = await User.findOne({ username });
    const { ratingsByUser } = user;

    // find the user current user rating, then replace it with the new user's rating
    ratingsByUser.forEach((data, i) => {
      data.idMeal === idMeal && (ratingsByUser[i].rating = newUserRating);
    });

    // save the updated user data
    user.markModified('ratingsByUser'); // ==> see changes on this specific key in the user object instance
    const updatedRatingsByUser = ratingsByUser;
    user.ratingsByUser = updatedRatingsByUser;
    await user.save();
    /*




    */
    // find the rating data by idMeal
    const mealRatingData = await Rating.findById(idMeal);
    const { byWho } = mealRatingData;
    const newByWhoIndex = byWho.findIndex((data) => data.username === username);

    // update total rating
    let newTotalRating = 0;
    mealRatingData.byWho[newByWhoIndex].rating = newUserRating; // ==> direct changes to mealRatingData obj
    byWho.forEach(({ rating }) => (newTotalRating = newTotalRating + rating));
    newTotalRating = parseFloat((newTotalRating / byWho.length).toFixed(2));
    mealRatingData.totalRating = newTotalRating; // ==> direct changes to mealRatingData obj

    // save meal rating data
    await mealRatingData.save();

    // destructure user & rating obj to return specific items only
    const { totalRating, _id } = mealRatingData;

    res.status(200).json({
      ok: true,
      code: 200,
      updateRating: true,
      mealRatingData: { totalRating, _id },
      ratingsByUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, ok: false, updateRating: false });
  }
};

module.exports = {
  getRating,
  addToRating,
  updateRating,
};
