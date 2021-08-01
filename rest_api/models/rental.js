const mongoose = require("mongoose");

const RentalSchema = new mongoose.Schema(
	{
		mobil: {
			type: mongoose.Schema.Types.Mixed,
			required: true,
		},
		peminjam: {
			type: mongoose.Schema.Types.Mixed,
			required: true,
		},
		jumlah_pinjam: {
			type: Number,
			required: true,
		},
		harga_pinjam: {
			type: mongoose.Schema.Types.Decimal128,
			required: true,
		},
		tanggal_pinjam : Date,
	},
	{
		timestamps: {
			createdAt: "created",
			updatedAt: "updated",
		},
	}
);

module.exports = mongoose.model("Rental", RentalSchema);
