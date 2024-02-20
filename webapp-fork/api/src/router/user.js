const express = require("express");
const router = express.Router();
const {
  postUserController,
  getUserController,
  putUserController,
} = require("../controllers/user");
const { middlewareauthen } = require("../middleware/middlewareauth");

router.post("/", postUserController);
router.get("/self", middlewareauthen, getUserController);
router.put("/self", middlewareauthen, putUserController);

router.all("/", (req, res) => {
  res.status(405).send();
});

router.all("/self", (req, res) => {
  res.status(405).send();
});

module.exports = router;
