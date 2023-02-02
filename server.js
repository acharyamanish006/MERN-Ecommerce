const { app, json_converter } = require("./config/express");
require("dotenv").config();
const connect_DB = require("./config/connectDB");
const router = require("./router/router");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const express = require("express");
//connecting to database
connect_DB();

//middleware
app.set("trust proxy", 1);
// app.use(
//   cors({
//     // origin: "https://graphic-card-seller.onrender.com",
//     origin: [
//       "http://localhost:3000",
//       "https://graphic-card-seller.onrender.com",
//     ], // replace with the origin of your client-side application
//     credentials: true,
//   })
// );
app.use(json_converter);
app.use(cookieParser());
app.use("/api/v1", router);
//err handler
// app.use((err, req, res) => {
//   res.json({
//     message: err.message,
//   });
// });
const BUILD_PATH = path.join(__dirname, "./build");
console.log(BUILD_PATH);
app.use(express.static(BUILD_PATH));
app.get("*", (req, res) => {
  res.sendFile(path.join(BUILD_PATH, "index.html"));
  // res.json(BUILD_PATH);
});

app.listen(process.env.PORT, () => {
  console.log(`port at ${process.env.PORT}`);
});
