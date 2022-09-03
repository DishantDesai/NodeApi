const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/user-routes");

const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/places", placesRoutes);
app.use("/users", userRoutes);
app.use((req, res, next) => {
  next(new HttpError("Could not find this route", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occur" });
});

mongoose
  .connect(
    `mongodb+srv://root:p2QkXaSWZrma7HTj@cluster0.elec5lg.mongodb.net/places?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3003);
  })
  .catch((error) => {
    console.log(error);
  });
