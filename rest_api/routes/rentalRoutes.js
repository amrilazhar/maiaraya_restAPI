const express = require("express");
const router = express.Router();

// import for auth needs
const { isUser } = require("../middlewares/auth");
const rentalController = require("../controllers/rentalController");
const carValidator = require("../middlewares/validators/carValidator");

// router here
router.get("/list", isUser, rentalController.listCar);
router.get(
	"/detail/:car_id",
	isUser,
	carValidator.checkCarId,
	rentalController.detailCar
);
router.post(
	"/rent",
	isUser,
    carValidator.checkCarIdAndDate,
	rentalController.checkAvailability,
	rentalController.rentCar
);
router.post(
	"/check_availability",
	isUser,
	carValidator.checkCarIdAndDate,
	rentalController.checkAvailability
);

module.exports = router;
