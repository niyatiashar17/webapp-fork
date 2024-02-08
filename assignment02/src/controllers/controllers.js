const { Sequelize } = require("sequelize");

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
        res.status(400).send();
        return;
      }

      await sequelize01.authenticate();
      console.log("Database connected!");
      res.status(200).send();
    } catch (err) {
      res.status(503).send();
      console.log("Not Connected");
    }
  } else {
    res.status(405).send();
  }
};

module.exports = {
  handleGetRequest,
};
