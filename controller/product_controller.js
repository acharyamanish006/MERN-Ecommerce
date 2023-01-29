const Product = require("../models/Product.js");
const User = require("../models/User.js");

const add_product = async (req, res) => {
  const { name, price, img, description, brand, condition, disPrice } =
    req.body;
  try {
    let new_product = await Product.create({
      name: name,
      img: img,
      price: price,
      description: description,
      brand: brand,
      condition: condition,
      disPrice: disPrice,
    });

    res.json({
      success: true,
      new_product,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
const get_product = async (req, res) => {
  const product_id = req.params.id;
  // console.log(id);
  try {
    let product = await Product.findById(product_id).populate({
      path: "reviews",
      populate: { path: "user" },
    });
    // let { Rating } = product;
    // const { reviews } = product;
    // Rating = 0;
    // let totalRating = 0;
    // let numberOfRating = 0;

    // reviews.map((data) => {
    //   numberOfRating += 1;
    //   totalRating = data.rating + totalRating;
    // });
    // console.log(numberOfRating);
    // console.log(totalRating);
    // Rating = totalRating / numberOfRating;
    // console.log(Rating);
    // Rating.push()
    // await product.save();

    res.json({
      success: true,
      product,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
const get_allProduct = async (req, res) => {
  try {
    // let product = await Product.find();
    // const { rating } = product;
    // res.json({
    //   success: true,
    //   rating,
    // });
    await Product.find().then((product) => {
      res.json({
        success: true,
        product,
      });
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
const delete_product = async (req, res) => {
  const product_id = req.params.id;
  try {
    let product = await Product.findByIdAndDelete(product_id);

    res.json({
      success: true,
      message: "Product Deleted",
      product,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
const update_product = async (req, res) => {
  const product_id = req.params.id;
  const { name, price } = req.body;
  try {
    let product = await Product.findById(product_id);
    if (name != null) {
      product.name = name;
    }
    if (price != null) {
      product.price = price;
    }
    await product.save();
    res.json({
      success: true,
      message: "Product Updated",
      product,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const add_toCart = async (req, res) => {
  const product_id = req.params.id;
  try {
    const user_id = req.user._id;
    // const product = await Product.findById(product_id);
    const user = await User.findById(user_id).populate("myCart");
    const { myCart } = user;
    // const { isCart } = product;

    for (let data of myCart) {
      if (data._id == product_id) {
        return res.json({
          success: false,
          message: "product is already in cart",
        });
      }
    }
    myCart.push(product_id);
    await user.save();
    isCart = true;

    res.json({
      success: true,
      message: "Added to Cart",

      user,
      // product,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const add_toWishList = async (req, res) => {
  const product_id = req.params.id;
  try {
    const user_id = req.user._id;
    const user = await User.findById(user_id).populate("myWishList");
    const { myWishList } = user;
    // let { isWishlist } = product;

    for (let data of myWishList) {
      if (data._id == product_id) {
        return res.json({
          success: false,
          message: "product is already in wishlist",
        });
      }
    }

    myWishList.push(product_id);
    await user.save();

    res.json({
      success: true,
      message: "Added to Wishlist",
      user,
    });

    // myWishList.map(async (data) => {
    //   // console.log(data._id);
    //   if (data._id == product_id) {
    //     return res.json({
    //       success: false,
    //       message: "product is already in wishlist",
    //     });
    //   } else {
    //     myWishList.push(product_id);
    //     await user.save();

    //     res.json({
    //       success: true,
    //       user,
    //     });
    //   }
    // });

    // console.log(myWishList);
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const get_cart = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await User.findById(user_id).populate("myCart");
    const { myCart } = user;
    res.json({
      myCart,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const get_wishlist = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await User.findById(user_id).populate("myWishList");
    const { myWishList } = user;
    res.json({
      myWishList,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const search_product = async (req, res) => {
  // res.json("hi");
  try {
    let search_param = req.params.search_Q;
    const product = await Product.find();

    const searched_product = product.filter((data) => {
      return search_param.toLowerCase() === " "
        ? data
        : data.name.toLowerCase().includes(search_param);
    });
    // ((product) => {
    //       product.filter((data) => {
    //         return search_param.toLowerCase() === " "
    //           ? data
    //           : data.name.toLowerCase().includes(search_param);
    //       });
    res.json({
      success: true,
      searched_product,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
const add_review = async (req, res) => {
  try {
    // const user_id = req.user._id;
    const product_id = req.params.id;
    const { user_id, rating, review } = req.body;

    const product = await Product.findById(product_id).populate("reviews");
    const user = await User.findById(user_id);
    // let { Rating } = product;
    const { reviews } = product;
    await reviews.push({
      user: user,
      rating: rating,
      review: review,
    });
    /*
        product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    */

    let totalRating = 0;
    let numberOfRating = 0;
    let val;
    val = reviews.filter((item) => {
      numberOfRating += 1;
      totalRating += item.rating;
    });
    // console.log(num);
    // console.log((To / num).toFixed(0));
    let ratingNum = (totalRating / numberOfRating).toFixed(0);
    product.Rating = ratingNum;
    // await product.push({
    //   Rating: 5,
    // });
    // console.log(Rating);

    await product.save();
    res.json({
      success: true,
      product,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
const delete_wishlist = async (req, res) => {
  try {
    const product_id = req.params.id;
    const user_id = req.user._id;
    const user = await User.findById(user_id);
    const { myWishList } = user;
    let index = myWishList.indexOf(product_id);
    myWishList.splice(index, 1);
    await user.save();

    res.json({
      index,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
const delete_cart = async (req, res) => {
  try {
    const product_id = req.params.id;
    const user_id = req.user._id;
    const user = await User.findById(user_id);
    const { myCart } = user;
    let index = myCart.indexOf(product_id);
    myCart.splice(index, 1);
    await user.save();
    res.json({
      index,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  add_product,
  get_allProduct,
  get_product,
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
};
