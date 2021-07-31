const express = require("express");
const router = express.Router();

// import for auth needs
const { isAdmin } = require("../middlewares/auth");
const adminController = require("../controllers/adminController");
const carValidator = require("../middlewares/validators/carValidator");

// router here
router.get("/car/:car_id", isAdmin, carValidator.checkCarId, adminController.detailCar);
router.get("/car", isAdmin, adminController.listCar);
router.post("/register_car", isAdmin, carValidator.registerCar, adminController.registerCar);
router.put("/car", isAdmin, carValidator.checkCarId, adminController.updateStock);
router.delete("/car/:car_id", isAdmin, carValidator.checkCarId, adminController.deleteCar);

module.exports = router;
