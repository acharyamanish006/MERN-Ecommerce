const mongoose = require("mongoose");

const User_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  avatar: {
    // url: {
    type: String,
    // },
    // public_id: {
    // type: String,
    // },
  },
  myPurchase: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      default: "purchases has't been made yet!",
    },
  ],
  myCart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      default: "Cart is Empty",
    },
  ],
  myWishList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      default: "Wishlist is Empty",
    },
  ],
});

module.exports = mongoose.model("user", User_Schema);
