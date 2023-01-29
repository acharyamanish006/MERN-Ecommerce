const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sign_in = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.json({
        success: false,
        message: "user doesn't exist",
      });
    }
    if (await bcrypt.compare(password, user.password)) {
      //sending cookie
      let token = jwt.sign(
        {
          id: user._id,
        },
        process.env.Secret_Key
      );
      let token_option = {
        expire: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      return res.cookie("token", token, token_option).json({
        success: true,
        message: "Your Signed IN",
        user,
      });
    } else {
      return res.json({
        success: false,
        message: "password doesn't match",
      });
    }
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

const sign_up = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    // console.log(name, email, password);
    if ((name || email || password) == "") {
      return res.json({
        success: false,
        message: "pls fill out ",
      });
    }
    let new_user = await User.findOne({ email });
    if (new_user) {
      return res.json({
        success: false,
        message: "user already exist",
      });
    }
    let hash_password = await bcrypt.hash(password, 10);
    new_user = await User.create({
      name,
      email,
      password: hash_password,
      avatar: avatar,
    });
    //sending cookie
    let token = jwt.sign(
      {
        id: new_user._id,
      },
      process.env.Secret_Key
    );
    let token_option = {
      expire: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    return res.cookie("token", token, token_option).json({
      success: true,
      message: "Your Signed Up",
      new_user,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

const sign_out = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "signed out successfully",
  });
};
const user_info = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await User.findById(user_id);
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
const anyUser_info = async (req, res) => {
  try {
    const user_id = req.params.id;
    const user = await User.findById(user_id);
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// const update_info = async (req, res) => {
//   try {
//     const user_id = req.user._id;
//     const user = await User.findById(user_id);
//     res.json({
//       success: true,
//       user,
//     });
//   } catch (err) {
//     res.json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

module.exports = { sign_in, sign_up, sign_out, user_info, anyUser_info };
