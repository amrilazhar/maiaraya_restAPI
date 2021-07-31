const { Car } = require("../models");
const validationErrorHandler = require("../helpers/validationErrorHandler");

class AdminController {
	async detailCar(req, res, next) {
		try {
			validationErrorHandler(req, res, next);
			let dataMobil = await Car.findOne({ _id: req.params.car_id });
			return res.status(200).json({ message: "success", data: dataMobil });
		} catch (error) {
			//console.log(error);
			if (!error.statusCode) {
				error.statusCode = 500;
				error.message = "Internal Server Error";
			}
			next(error);
		}
	}
	async listCar(req, res, next) {
		try {
			validationErrorHandler(req, res, next);
			let dataMobil = await Car.find();
			return res.status(200).json({ message: "success", data: dataMobil });
		} catch (error) {
			//console.log(error);
			if (!error.statusCode) {
				error.statusCode = 500;
				error.message = "Internal Server Error";
			}
			next(error);
		}
	}
	async registerCar(req, res, next) {
		try {
			validationErrorHandler(req, res, next);

			let dataMobil = await Car.create(req.body);
			return res.status(200).json({ message: "success", data: dataMobil });
		} catch (error) {
			console.log(error);
			if (
				error.code == 11000 &&
				error.keyPattern.merk == 1 &&
				error.keyPattern.tipe_varian == 1 &&
				error.keyPattern.kondisi == 1
			) {
				error.statusCode = 400;
				error.message =
					"Mobil dengan merk , tipe, dan kondisi tersebut sudah pernah di input";
			} else if (!error.statusCode) {
				error.statusCode = 500;
				error.message = "Internal Server Error";
			}
			next(error);
		}
	}
	async updateStock(req, res, next) {
		try {
			validationErrorHandler(req, res, next);

			let dataMobil = await Car.findOneAndUpdate(
				{ _id: req.body.car_id },
				{ jumlah: req.body.jumlah },
				{ new: true }
			);
            if (!dataMobil){
                const error = new Error("id car not found");
				error.statusCode = 400;
				throw error;
            }
			return res.status(200).json({ message: "success", data: dataMobil });
		} catch (error) {
			if (!error.statusCode) {
				error.statusCode = 500;
				error.message = "Internal Server Error";
			}
			next(error);
		}
	}
	async deleteCar(req, res, next) {
		try {
			validationErrorHandler(req, res, next);

			let carDelete = await Car.deleteOne({ _id: req.params.car_id });
			// If success
			console.log(carDelete);
			if (carDelete.deletedCount == 0) {
				const error = new Error("id car not found");
				error.statusCode = 400;
				throw error;
			}
			return res.status(200).json({ message: "Car record successfully deleted" });
		} catch (error) {
			console.log(error);
			if (!error.statusCode) {
				error.statusCode = 500;
				error.message = "Internal Server Error";
			}
			next(error);
		}
	}
}

module.exports = new AdminController();
