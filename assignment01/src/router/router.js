const express = require("express");
const router = express.Router();
const healthzController = require("../controllers/controllers");


router.all("/", healthzController.handleGetRequest);


module.exports = router;
