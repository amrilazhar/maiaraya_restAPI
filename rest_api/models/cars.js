const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
	{
		merk: { type: String, required: true },
		tipe_varian: { type: String, required: true },
		kondisi: String,
		jumlah: Number,
		harga_sewa: Number,
	},
	{
		timestamps: {
			createdAt: "created",
			updatedAt: "updated",
		},
	}
);
CarSchema.index({ merk: 1, tipe_varian: 1 }, { unique: true });
CarSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		// remove these props when object is serialized
		delete ret._id;
	},
});

module.exports = mongoose.model("Car", CarSchema);
