const { Sequelize } = require("sequelize");
const logger = require("../logger/logger");

const sequelize01 = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,

  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  }
);

const handleGetRequest = async (req, res) => {
  logger.info("Handling GET request", { severity: "INFO" });
  res.setHeader("Cache-control", "no-cache,no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "GET") {
    try {
      if (
        Object.keys(req.query).length > 0 ||
        req.headers["content-length"]?.length > 0 ||
        Object.keys(req.body).length > 0 ||
        Object.keys(req.params).length > 0
      ) {
        logger.warn("Bad request", { severity: "WARNING" });
        res.status(400).send();
        return;
      }

      await sequelize01.authenticate();
      logger.info("Health API Connected", { severity: "INFO" });

      res.status(200).send();
    } catch (err) {
      res.status(503).send();
      logger.error("Not Connected", { severity: "ERROR" });
    }
  } else {
    logger.warn("Method not allowed", { severity: "WARNING" });
    res.status(405).send();
  }
};

module.exports = {
  handleGetRequest,
};
