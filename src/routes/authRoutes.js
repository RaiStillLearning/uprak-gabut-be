const express = require("express");
const router = express.Router();
const { requestAccount } = require("../controllers/requestAccountController");

router.post("/request-account", requestAccount);

module.exports = router;
