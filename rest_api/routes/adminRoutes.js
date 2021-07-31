const express = require("express");
const router = express.Router();

// import for auth needs
const { isAdmin } = require("../middlewares/auth");
const authController = require("../controllers/authController");

// router here
router.post("/daftar_mobil", userValidator.signup, doAuth, authController.getAccessToken);
router.post("/tambah_stok", userValidator.signup, doAuth, authController.getAccessToken);
router.put("/update_stok", userValidator.login, doAuth, authController.getAccessToken);

module.exports = router;
