const { body } = require("express-validator");

exports.signup = [
  body("name", "name field is required!").trim().notEmpty(),
  body("email", "Please enter valid email id!")
    .notEmpty()
    .normalizeEmail()
    .isEmail(),
  body("usename", "Please enter valid username!")
    .notEmpty()
    .isAlphanumeric()
    .isLength({ min: 5, max: 8 }),
  body("password", "Password length must be between 6 to 16 characters!")
    .trim()
    .notEmpty()
    .isLength({ min: 6, max: 16 }),
];
