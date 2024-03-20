const express = require("express");
const logger = require('../logger/logger');

const {
  postUserService,
  getUserService,
  putUserService,
} = require("../services/users");

const postUserController = async (req, res) => {
  logger.info('Posting user controller',{severity:'INFO'});
    await postUserService(req, res);
  
};

const getUserController = async (req, res) => {
  logger.info('Getting user controller');
 
    if (req.headers["content-length"]?.length > 0) {
      logger.warn('Request should not have body',{severity : 'WARNING'});
      res.status(400).json("Request should not have body");
    } else {
      await getUserService(req, res);
    }
};

const putUserController = async (req, res) => {
  logger.info('Putting user controller',{severity : 'INFO'});
    await putUserService(req, res);
  
};
module.exports = { postUserController, getUserController, putUserController };
