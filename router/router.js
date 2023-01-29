const express = require("express");
const {
  add_product,
  get_product,
  get_allProduct,
  delete_product,
  update_product,
  add_toCart,
  add_toWishList,
  get_cart,
  get_wishlist,
  search_product,
  add_review,
  delete_cart,
  delete_wishlist,
} = require("../controller/product_controller");
const {
  sign_in,
  sign_up,
  sign_out,
  user_info,
  anyUser_info,
} = require("../controller/user_controller");
const Auth = require("../middleware/Auth");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

//auth
router.route("/is/auth").get(isAuth);
// login routes
router.route("/sign/in").post(sign_in);
router.route("/sign/up").post(sign_up);
router.route("/sign/out").get(Auth, sign_out);

//product routes
router.route("/user/info").get(Auth, user_info);
router.route("/user/info/:id").get(Auth, anyUser_info);
router.route("/add/product").post(Auth, add_product);
router.route("/get/all/product").get(Auth, get_allProduct);
router.route("/add/review/:id").post(Auth, add_review);

//cart & wishlist
router.route("/get/product/cart/:id").get(Auth, add_toCart);
router.route("/get/product/delete/cart/:id").get(Auth, delete_cart);
router.route("/get/product/wishlist/:id").get(Auth, add_toWishList);
router.route("/get/product/delete/wishlist/:id").get(Auth, delete_wishlist);
router.route("/get/product/cart").get(Auth, get_cart);
router.route("/get/product/wishlist").get(Auth, get_wishlist);

//search
router.route("/get/product/search/:search_Q").get(Auth, search_product);

router
  .route("/product/:id")
  .get(Auth, get_product)
  .delete(Auth, delete_product)
  .patch(Auth, update_product);

module.exports = router;
