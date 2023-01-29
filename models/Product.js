const mongoose = require("mongoose");

const product_Schema = new mongoose.Schema({
  name: {
    type: String,
    Required: [true, "plz enter the product name"],
  },
  img: {
    // public_id: String,
    type: String,
  },
  price: {
    type: Number,
    Required: [true, "plz enter the product price"],
  },
  description: {
    type: String,
    default: "Product details are unavailable",
  },
  condition: {
    type: String,
  },
  brand: {
    type: String,
  },
  disPrice: {
    type: Number,
  },
  Rating: {
    type: Number,
    // min: 1,
    // max: 5,
    default: 0,
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      rating: Number,
      review: String,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", product_Schema);
