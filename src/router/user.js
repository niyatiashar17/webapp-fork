const express = require("express");
const router = express.Router();
const logger = require("../logger/logger");
const {
  postUserController,
  getUserController,
  putUserController,
} = require("../controllers/user");
const { middlewareauthen } = require("../middleware/middlewareauth");

router.post("/", (req, res, next) => {
  logger.info('POST / - User creation request received',{severity:'INFO'});
  postUserController(req, res, next);
});

router.get("/self", middlewareauthen, (req, res, next) => {
  logger.info('GET /self - User data request received',{severity:'INFO'});
  getUserController(req, res, next);
});

router.put("/self", middlewareauthen, (req, res, next) => {
  logger.info('PUT /self - User update request received',{severity:'INFO'});
  putUserController(req, res, next);
});

router.all("/", (req, res) => {
  logger.warn('Invalid method request received at /',{severity:'WARNING'});
  res.status(405).send();
});

router.all("/self", (req, res) => {
  logger.warn('Invalid method request received at /self',{severity:'WARNING'});
  res.status(405).send();
});

module.exports = router;
