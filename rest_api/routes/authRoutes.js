const express = require("express");
const router = express.Router();

// import for auth needs
const { doAuth } = require("../middlewares/auth/");
const authController = require("../controllers/authController");
const userValidator = require("../middlewares/validators/userValidator");

router.post("/signup", userValidator.signup, doAuth, authController.getAccessToken);
router.post("/login", userValidator.login, doAuth, authController.getAccessToken);

module.exports = router;
