const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: null },
    hobby: { type: [String] },
    phone: { type: Number, default: null },
    ratingsByUser: [
      {
        idMeal: { type: Number, required: true, unique: true },
        rating: { type: Number, required: true },
      },
    ],
    savedRecipes: { type: [Number] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
