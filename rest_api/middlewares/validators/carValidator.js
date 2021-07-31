const { body, check } = require("express-validator");
const mongoose = require("mongoose");

const isValidObjectId = async (value, { req }) => {
	const isValidObjectId = mongoose.isValidObjectId(value);
	if (!isValidObjectId) {
		return Promise.reject("Car ID is not valid");
	}
	return true;
};

const objectId = (value) => {
	if (value) {
		return mongoose.Types.ObjectId(value);
	}
};

exports.registerCar = [
	body("merk").trim().notEmpty(),
	check("tipe_varian").trim().notEmpty(),
	body("kondisi").trim().notEmpty(),
	body("harga_sewa").trim().notEmpty().isNumeric(),
];

exports.checkCarId = [
	check("car_id").custom(isValidObjectId).bail().customSanitizer(objectId),
];