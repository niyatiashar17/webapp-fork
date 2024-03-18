const { Sequelize, DataTypes } = require("sequelize");
const logger = required("/src/logger/logger.js");

const sequelize01 = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    logging: false,
  }
);

const users = sequelize01.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      readOnly: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        isValidEmail(value) {
          const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
          if (!emailRegex.test(value)) {
            throw new Error("Invalid email format for username.");
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First Name cannot be empty.",
        },
        len: {
          args: [2, 255],
          msg: "First Name must be between 2 and 255 characters.",
        },
        doesNotContain(value) {
          const invalidCharsRegex = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-\s]/;
          if (invalidCharsRegex.test(value)) {
            throw new Error(
              "First Name should not contain numbers, special characters, or spaces."
            );
          }
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last Name cannot be empty.",
        },
        len: {
          args: [2, 255],
          msg: "Last Name must be between 2 and 255 characters.",
        },
        doesNotContainInvalidChars(value) {
          const invalidCharsRegex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]/;
          if (invalidCharsRegex.test(value)) {
            throw new Error(
              "Last Name should not contain numbers, special characters, or spaces."
            );
          }
        },
      },
    },
    account_created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    account_updated: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  { timestamps: false, createdAt: false, updatedAt: false }
);

// Adding hook to update account_updated field before update operation
users.beforeUpdate((user, options) => {
  user.setDataValue("account_updated", new Date());
});

// Createing a new database if not already created
// sequelize01
//   .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
//   .then(() => {
//     console.log("Database created or already exists");
//   })
//   .catch((error) => {
//     console.error("Error creating database:", error);
//   });

users
  .sync({ force: false })
  .then(() => {
    logger.info("Table Created");
    //console.log("Table Created");
  })
  .catch((err) => {
    logger.error("Table Not Created, err");
    //console.log("Table Not Created", err);
  });

module.exports = { users, sequelize01 };
