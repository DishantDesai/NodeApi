const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
exports.errorValidation = (req, res, next) => {
  const errors = validationResult(req);

  console.log(errors.array());
  if (!errors.isEmpty())
    return next(
      new HttpError("Invalid input passed, please check your data", 422)
    );
  next();
};
