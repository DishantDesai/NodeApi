const { body } = require("express-validator");

exports.createPlace = [
  body("title").trim().notEmpty(),
  body("description").trim().notEmpty().isLength({ min: 5 }),
  body("address").trim().notEmpty(),
  body("creator").trim().notEmpty(),
];

exports.updatePlace = [
  body("title").trim().notEmpty(),
  body("description").trim().notEmpty().isLength({ min: 5 }),
];
