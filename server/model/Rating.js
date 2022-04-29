const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
    _id: { type: Number, immutable: true },
    totalRating: { type: Number, required: true },
    byWho: [
      {
        username: { type: String, required: true, unique: true },
        rating: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Rating', RatingSchema);
