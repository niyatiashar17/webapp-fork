const express = require("express");
const logger = require('../logger/logger');

const {
  postUserService,
  getUserService,
  putUserService,
} = require("../services/users");

const postUserController = async (req, res) => {
  logger.info('Posting user controller');
  try {
    await postUserService(req, res);
    logger.info('User posted successfully');
  } catch (error) {
    logger.error('Error in posting user controller', error);
  }
};

const getUserController = async (req, res) => {
  logger.info('Getting user controller');
  try {
    if (req.headers["content-length"]?.length > 0) {
      logger.warn('Request should not have body');
      res.status(400).json("Request should not have body");
    } else {
      await getUserService(req, res);
      logger.info('User fetched successfully');
    }
  } catch (error) {
    logger.error('Error in getting user controller', error);
  }
};

const putUserController = async (req, res) => {
  logger.info('Putting user controller');
  try {
    await putUserService(req, res);
    logger.info('User updated successfully');
  } catch (error) {
    logger.error('Error in putting user controller', error);
  }
};
module.exports = { postUserController, getUserController, putUserController };
