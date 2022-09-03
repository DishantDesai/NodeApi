const express = require("express");

const placeController = require("../controllers/place-controllers");
const placeValidator = require("../validators/places-validators");
const errorValidationMiddleware = require("../middlewares/error-validation-middleware");
const router = express.Router();

router.get("/:pid", placeController.getPlaceByPlaceId);
router.get("/user/:uid", placeController.getPlacesByUserId);
router.post(
  "/",
  placeValidator.createPlace,
  errorValidationMiddleware.errorValidation,
  placeController.createPlace
);
router.patch(
  "/:id",
  placeValidator.updatePlace,
  errorValidationMiddleware.errorValidation,
  placeController.updatePlace
);
router.delete("/:id", placeController.deletePlace);

module.exports = router;
