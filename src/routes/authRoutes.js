const express = require("express");
const router = express.Router();
const { requestAccount } = require("../controllers/requestAccountController");
const authController = require("../controllers/authController");

router.post("/request-account", requestAccount);
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
