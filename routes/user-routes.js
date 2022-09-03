const express = require("express");

const usersController = require("../controllers/users-controllers");
const usersValidation = require("../validators/users-validator");
const errorValidationMiddleware = require("../middlewares/error-validation-middleware");

const router = express.Router();

router.get("/", usersController.getAllUsers);
router.post(
  "/signup",
  usersValidation.signup,
  errorValidationMiddleware.errorValidation,
  usersController.signup
);
router.post("/login", usersController.login);

module.exports = router;
