const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");
const getCoordForAddress = require("../utils/location");
const Place = require("../models/place");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Old port",
    description: "Montreal's oldest place",
    location: {
      lat: 45.506972,
      long: -73.549807,
    },
    address: "Vieux-Port de MontréalMontreal, QC",
    creator: "u1",
  },
];

const getPlaceByPlaceId = (req, res, next) => {
  const pId = req.params.pid;
  const place = DUMMY_PLACES.find((place) => place.id === pId);
  if (!place) {
    return next(new HttpError("Could not find a place with provided id", 404));
  }
  res.json({
    place,
    status: 200,
    message: "Success!",
  });
};

const getPlacesByUserId = (req, res, next) => {
  const uId = req.params.uid;
  const place = DUMMY_PLACES.filter((place) => place.creator === uId);
  if (!place.length) {
    return next(new HttpError("Could not find a place with provided id", 404));
  }
  res.json({
    place,
    status: 200,
    message: "Success!",
  });
};

const createPlace = async (req, res, next) => {
  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordForAddress(address);
  } catch (err) {
    return next(err);
  }

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    image: "https://picsum.photos/id/237/200/300",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Creating place failed,please try again."));
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (DUMMY_PLACES.find((p) => p.id === placeId)) {
    next(new HttpError("Could not find place with that id", 404));
  }
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  const deletedPlace = DUMMY_PLACES.splice(placeIndex, 1);
  res.status(200).json({ place: deletedPlace });
};

exports.getPlaceByPlaceId = getPlaceByPlaceId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
