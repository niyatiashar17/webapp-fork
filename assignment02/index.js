const express = require("express");
require("dotenv").config();

const healthCheck = require("../assignment02/src/router/router");
const userrouter = require("./src/router/user");
const bodyParser = require("body-parser");
const { sequelize01, users } = require("./src/models/user");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

//middleware
app.use(async (req, res, next) => {
  res.setHeader("Cache-control", "no-cache,no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("X-Content-Type-Options", "nosniff");

  try {
    await sequelize01.authenticate();
    next();
  } catch (error) {
    res.status(503).end();
  }
});

// const { DB_HOST,DB_USERNAME,DB_PASSWORD,} = config.database;
// const connection = await mysql.createConnection({ host, port, user, password });
// await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

// // Function to create database if it doesn't exist
// async function createDatabase() {
//   try {
//     await sequelize01.query(
//       `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`
//     );
//     console.log("Database created or already exists");
//   } catch (error) {
//     console.error("Error creating database:", error);
//     throw error; // Re-throw the error to handle it elsewhere
//   }
// }

// // Create the database before starting the server
// createDatabase()
//   .then(() => {
//     // Sync the model with the database
//     return users.sync({ force: false });
//   })
//   .then(() => {
//     console.log("Table Created");
//     // Start the server
//     app.listen(port, () => {
//       console.log(`Server is running at http://localhost:${port}`);
//     });
//   })
//   .catch((err) => {
//     console.log("Error:", err);
//   });

app.use(async (req, res, next) => {
  if (Object.keys(req.query).length > 0 || Object.keys(req.params).length > 0) {
    res.status(400).json({ message: "Query or Params not allowed" });
  } else {
    next();
  }
});
app.use("/healthz", healthCheck);
app.use("/v1/user", userrouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports=app;