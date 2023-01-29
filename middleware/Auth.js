const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    const decoded = jwt.verify(token, process.env.Secret_Key);
    const user_id = decoded.id;
    const user = await User.findById(user_id);
    req.user = user;
    return next();
    // return res.json({
    //   success: true,
    //   user,
    // });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = Auth;
