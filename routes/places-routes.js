const express = require("express");

const placeController = require("../controllers/place-controller");

const router = express.Router();

router.get("/:pid", placeController.getPlaceByPlaceId);
router.get("/user/:uid", placeController.getPlacesByUserId);
router.post("/", placeController.createPlace);
router.patch("/:id", placeController.updatePlace);
router.delete("/:id", placeController.deletePlace);

module.exports = router;
