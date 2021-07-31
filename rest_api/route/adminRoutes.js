const express = require("express");
const router = express.Router();

// import for auth needs
const { isAdmin } = require("../middlewares/auth");

// router here

module.exports = router;
