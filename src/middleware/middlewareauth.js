var express = require("express");
var app = express();
const bcrypt = require("bcrypt");
const { users } = require("../models/user");
const logger = require("../logger/logger");

const middlewareauthen = async (req, res, next) => {
  if (!req.get("Authorization")) {
    logger.warn('No authorization header present',{severity:'WARNING'});
    var error = new Error("Not Authenticated");
    res.status(401).set("WWW-Authenticate", "Basic");
    next(error);
  } else {
    var credentials = Buffer.from(
      req.get("Authorization").split(" ")[1],
      "base64"
    )
      .toString()
      .split(":");

    var username = credentials[0];
    var password = credentials[1];

    const userdetails = await users.findOne({ where: { username } });
    //console.log(password, userdetails);
    if (!userdetails) {
      logger.warn(`User not found: ${username}`,{severity:'WARNING'});
      var error = new Error("User Not Found");
      res.status(401).set("WWW-Authenticate", "Basic").end();
    } else {
      //console.log(password, userdetails);
      const passwordMatches = await bcrypt.compare(
        password,
        userdetails.password
      );
      if (passwordMatches) {
        logger.info(`User authenticated: ${username}`,{severity:'INFO'});
        req.userdetails = userdetails;
        next();
      } else {
        logger.error(`Authentication failed for user: ${username}`,{severity:'ERROR'});
        res.status(401).end();
      }
    }
  }
};

module.exports = {
  middlewareauthen,
};
