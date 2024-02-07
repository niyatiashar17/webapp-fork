const express = require("express");


const {
  postUserService,
  getUserService,
  putUserService,
} = require("../services/users");

const postUserController = async (req, res) => {
  await postUserService(req, res);
};

const getUserController = async (req, res) => {
  if (req.headers["content-length"]?.length > 0) {
    res.status(400).json("Request should not have body");
  } else {
    await getUserService(req, res);
  }
};

const putUserController = async (req, res) => {
  await putUserService(req, res);
};
module.exports = { postUserController, getUserController, putUserController };
