const mongoose = require("mongoose");

const connect_DB = () => {
  mongoose.connect(process.env.DB_URI, () => {
    console.log("connected");
  });
};

module.exports = connect_DB;
