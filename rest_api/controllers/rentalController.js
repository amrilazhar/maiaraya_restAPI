const { Car, Rental, User } = require("../models");
const validationErrorHandler = require("../helpers/validationErrorHandler");

class RentalController {
	async detailCar(req, res, next) {
		try {
			validationErrorHandler(req, res, next);
			let dataMobil = await Car.findOne({ _id: req.params.car_id });

			if (!dataMobil)
				return res.status(200).json({ message: "Not Found", data: "Not Found" });
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

			if (dataMobil.length == 0)
				return res.status(200).json({ message: "Not Found", data: ["Not Found"] });
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

	async checkAvailability(req, res, next) {
		try {
			validationErrorHandler(req, res, next);

			//define start and end sewa
			let startSewa = new Date(req.body.start_date);
			let endSewa = req.body.end_date
				? new Date(req.body.end_date)
				: new Date(req.body.start_date);

			//get jumlah mobil
			let dataMobil = await Car.findById(req.body.car_id);

			//get list sewa mobil
			let dataSewa = await Rental.find({
				"mobil._id": req.body.car_id,
				tanggal_pinjam: { $gte: startSewa, $lte: endSewa },
			});

			//check availability
			let availableAllDate = true;
			// create list jumlah sewa per tanggal
			let listJumlahSewaPerTanggal = {};
			dataSewa.forEach((el) => {
				let key = el.tanggal_pinjam.toLocaleDateString("id-ID");
				if (listJumlahSewaPerTanggal[key]) {
					listJumlahSewaPerTanggal[key] += el.jumlah_pinjam;
				} else {
					listJumlahSewaPerTanggal[key] = el.jumlah_pinjam;
				}
			});

			//cek ketersediaan mobil per tanggal
			for (const key in listJumlahSewaPerTanggal) {
				let available =
					dataMobil.jumlah - listJumlahSewaPerTanggal[key] - req.body.jumlah_pinjam;
				listJumlahSewaPerTanggal[key] =
					available >= 0 ? "available" : `kurang ${available * -1} mobil `;

				//if there's one date unavailable, set the flag to false
				if (available < 0) {
					availableAllDate = false;
				}
			}

			let act = req.route.path.substring(1);
			if (act == "rent") {
				//go to next middleware if it's renting the car
				if (availableAllDate) next();
				else {
					return res
						.status(200)
						.json({ message: "Not Available", data: listJumlahSewaPerTanggal });
				}
			} else {
				//if just check availability, return the data
				res
					.status(200)
					.json({ message: "success", data: listJumlahSewaPerTanggal });
			}
		} catch (error) {
			console.log(error);
			if (!error.statusCode) {
				error.statusCode = 500;
				error.message = "Internal Server Error";
			}
			next(error);
		}
	}
	async rentCar(req, res, next) {
		try {
			validationErrorHandler(req, res, next);

			//define start and end sewa
			let startSewa = new Date(req.body.start_date);
			let endSewa = req.body.end_date
				? new Date(req.body.end_date)
				: new Date(req.body.start_date);

			// get date different in days
			let diffTime = endSewa.getTime() - startSewa.getTime();
			let diffDays = diffTime / (1000 * 3600 * 24) + 1;

			//prepare inserted data
			let peminjam = await User.findById(req.user.id);
			delete peminjam.password;

			let mobil = await Car.findById(req.body.car_id);
			let dataSewa = {
				mobil: mobil,
				peminjam: peminjam,
				jumlah_pinjam: req.body.jumlah_pinjam,
				harga_pinjam: mobil.harga_sewa,
				tanggal_pinjam: startSewa,
			};

			//inser data to database
			for (let i = 0; i < diffDays; i++) {
				await Rental.create(dataSewa);
				dataSewa.tanggal_pinjam = startSewa.setDate(startSewa.getDate() + 1);
			}

			//return invoice data
			delete dataSewa.tanggal_pinjam;
			dataSewa.start_sewa = startSewa;
			dataSewa.start_sewa = endSewa;
			dataSewa.total_harga_sewa =
				eval(req.body.jumlah_pinjam) * eval(mobil.harga_sewa) * eval(diffDays);

			return res.status(200).json({ message: "success", data: dataSewa });
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

module.exports = new RentalController();
