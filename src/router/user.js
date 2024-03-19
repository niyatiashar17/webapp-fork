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
  logger.info('POST / - User creation request received');
  postUserController(req, res, next);
});

router.get("/self", middlewareauthen, (req, res, next) => {
  logger.info('GET /self - User data request received');
  getUserController(req, res, next);
});

router.put("/self", middlewareauthen, (req, res, next) => {
  logger.info('PUT /self - User update request received');
  putUserController(req, res, next);
});

router.all("/", (req, res) => {
  logger.warn('Invalid method request received at /');
  res.status(405).send();
});

router.all("/self", (req, res) => {
  logger.warn('Invalid method request received at /self');
  res.status(405).send();
});

module.exports = router;
