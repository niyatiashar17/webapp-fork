const { users } = require("../models/user");
const bcrypt = require("bcrypt");
const logger = require("../logger/logger");

const getUserService = async (req, res) => {
  logger.info("Getting user service");
  try {
    return res.status(200).json({
      id: req.userdetails.id,
      username: req.userdetails.username,
      firstName: req.userdetails.firstName,
      lastName: req.userdetails.lastName,
      account_created: req.userdetails.account_created,
      account_updated: req.userdetails.account_updated,
    });
  } catch (error) {
    logger.error("Error getting user service", error);
    return res.status(400).json({
      error,
    });
  }
};

async function postUserService(req, res) {
  try {
    logger.info("Posting user service");
    const { username, password, firstName, lastName, ...extraFields } =
      req.body;
    const userdetails = req.body;
    if (Object.keys(extraFields).length > 0) {
      return res.status(400).json({
        error: "User Name, Password, First Name, Last Name are only allowed",
      });
    }
    if (
      !userdetails.password.match(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/
      )
    ) {
      return res.status(400).json({
        error: "Invalid Password",
      });
    }
    userdetails.password = await bcrypt.hash(userdetails.password, 10);
    const user = await users.create(userdetails);

    return res.status(201).json({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      account_created: user.account_created,
      account_updated: user.account_updated,
    });
  } catch (error) {
    logger.error("Error in posting user service", error);
    //console.error(error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ error: error.message });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json(error);
    } else {
      return res.status(400).send("Cannot create user");
    }
  }
}

const putUserService = async (req, res) => {
  try {
    logger.info("Putting user service");
    const { password, firstName, lastName, ...extraFields } = req.body;
    const userdetails = req.body;
    if (Object.keys(extraFields).length > 0) {
      return res.status(400).json({ error: "No extra attributes allowed" });
    }
    if (
      !password.match(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/
      )
    ) {
      return res.status(400).end({ error: "Invalid Password" });
    }

    userdetails.password = await bcrypt.hash(userdetails.password, 10);
    userdetails.account_updated = new Date();

    const user = await users.update(
      {
        firstName,
        lastName,
        password: userdetails.password,
        account_updated: userdetails.account_updated,
      },
      {
        where: { username: req.userdetails.username },
      }
    );
    return res.status(204).json({ message: "Details of the user updated" });
  } catch (error) {
    logger.error("Error in putting user service", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json(error.errors[0].message);
    } else if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json(error);
    } else {
      return res.status(400).send("Cannot update user");
    }
  }
};

module.exports = {
  getUserService,
  postUserService,
  putUserService,
};
