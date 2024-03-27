const { users, metadata_users } = require("../models/user");
const bcrypt = require("bcrypt");
const logger = require("../logger/logger");
const { PubSub } = require("@google-cloud/pubsub");
if (process.env.NODE_ENV !== "test") {
  const pubSubClient = new PubSub({
    projectId: "csye-6225-terraform-415001",
  });
}

const getUserService = async (req, res) => {
  logger.info("Getting user service", { severity: "INFO" });
  try {
    res.status(200).json({
      id: req.userdetails.id,
      username: req.userdetails.username,
      firstName: req.userdetails.firstName,
      lastName: req.userdetails.lastName,
      account_created: req.userdetails.account_created,
      account_updated: req.userdetails.account_updated,
    });
    logger.info("User fetched successfully", { severity: "INFO" });
    return;
  } catch (error) {
    //logger.error("Error getting user service", error);
    return res.status(400).json({
      error,
    });
  }
};

async function postUserService(req, res) {
  try {
    logger.info("Posting user service", { severity: "INFO" });
    const { username, password, firstName, lastName, ...extraFields } =
      req.body;
    const userdetails = req.body;
    if (Object.keys(extraFields).length > 0) {
      logger.warn(
        "User Name, Password, First Name, Last Name are only allowed",
        { severity: "WARNING" }
      );
      return res.status(400).json({
        error: "User Name, Password, First Name, Last Name are only allowed",
      });
    }
    if (
      !userdetails.password.match(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/
      )
    ) {
      logger.warn("Invalid password format", { severity: "WARNING" });
      return res.status(400).json({
        error: "Invalid Password",
      });
    }
    userdetails.password = await bcrypt.hash(userdetails.password, 10);
    const user = await users.create(userdetails);
    //logger.debug(`User created: ${user.username}`);

    //Publish a message to the Pubsub topic after the user is created
    const topicName = "verify_email";
    const data = JSON.stringify({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      account_created: user.account_created,
      account_updated: user.account_updated,
    });
    const dataBuffer = Buffer.from(data);

    //await pubSubClient.topic(topicName).publish(dataBuffer);

    if (process.env.NODE_ENV !== "test") {
      const messageId = await pubSubClient
        .topic(topicName)
        .publishMessage({ data: dataBuffer });
      console.log(`Message ${messageId} published.`);
    }

    return res.status(201).json({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      account_created: user.account_created,
      account_updated: user.account_updated,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "SequelizeValidationError") {
      logger.error(`Error in posting user service ${error.message}`, {
        severity: "ERROR",
      });
      return res.status(400).json({ error: error.message });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      logger.error("Provide a unique username", { severity: "ERROR" });
      return res.status(409).json(error);
    } else {
      logger.error(`Error in posting user service Cannot create user`, {
        severity: "ERROR",
      });
      return res.status(400).json({ error: error });
    }
  }
}

const getVerifyUserService = async (req, res) => {
  try {
    logger.info("getVerifyUserService: Verifying user", { severity: "INFO" });

    const { id } = req.query;

    if (!id) {
      logger.info("getVerifyUserServicee: Id is required", {
        severity: "ERROR",
      });
      return res.status(400).json({ error: "Id is required" });
    }

    const user = await metadata_users.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      logger.error(
        `getVerifyUserService: User not created in metadata_users table`,
        {
          severity: "ERROR",
        }
      );
      return res
        .status(404)
        .json({ error: "User not created in user_metadata table" });
    } else {
      if (getTimeDifference(user.timestamp)) {
        logger.error(`getVerifyUserService: Verification time expired`, {
          severity: "ERROR",
        });
        return res.status(400).json({ error: "Verification time expired" });
      }
    }

    await users.update(
      {
        is_verified: true,
      },
      {
        where: {
          id: id,
        },
      }
    );

    logger.info(`getVerifyUserService: User verified successfully`, {
      severity: "INFO",
    });

    return res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    logger.error(`getVerifyUserService: Error verifying user: ${error}`, {
      severity: "ERROR",
    });
    return res.status(400).json({ error: error });
  }
};

const putUserService = async (req, res) => {
  try {
    logger.info("Putting user service", { severity: "INFO" });
    const { password, firstName, lastName, ...extraFields } = req.body;
    const userdetails = req.body;
    if (Object.keys(extraFields).length > 0) {
      logger.warn("Extra fields are not allowed", { severity: "WARNING" });
      return res.status(400).json({ error: "No extra attributes allowed" });
    }
    if (
      !password.match(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/
      )
    ) {
      logger.warn("Invalid password format", { severity: "WARNING" });
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
    //logger.debug(`User updated: ${user.username}`);
    logger.info("User updated successfully", { severity: "INFO" });
    return res.status(204).json({ message: "Details of the user updated" });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      logger.error(`Error in putting user service ${error.errors[0].message}`, {
        severity: "ERROR",
      });
      return res.status(400).json(error.errors[0].message);
    } else if (error.name === "SequelizeUniqueConstraintError") {
      logger.error(`Error in putting user service ${error}`, {
        severity: "ERROR",
      });
      return res.status(409).json(error);
    } else {
      logger.error("Cannot update user", { severity: "ERROR" });
      return res.status(400).send("Cannot update user");
    }
  }
};

const getTimeDifference = (dbTimeStamp) => {
  const currUTCTime = new Date(
    new Date().toISOString().slice(0, 19).replace("T", " ")
  ).getTime();
  dbTimeStamp = new Date(dbTimeStamp).getTime();

  const diff = Math.abs(currUTCTime - dbTimeStamp) / 1000 / 60;
  return diff > 2;
};

module.exports = {
  getUserService,
  postUserService,
  putUserService,
  getVerifyUserService,
};
