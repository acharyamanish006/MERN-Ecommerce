const { app, json_converter } = require("./config/express");
require("dotenv").config();
const connect_DB = require("./config/connectDB");
const router = require("./router/router");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//connecting to database
connect_DB();

//middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://graphic-card-seller.onrender.com",
    ], // replace with the origin of your client-side application
    credentials: true,
  })
);
app.use(json_converter);
app.use(cookieParser());
app.use("/api/v1", router);
//err handler
// app.use((err, req, res) => {
//   res.json({
//     message: err.message,
//   });
// });

app.listen(process.env.PORT, () => {
  console.log(`port at ${process.env.PORT}`);
});
