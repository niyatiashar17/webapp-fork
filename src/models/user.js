const { Sequelize, DataTypes } = require("sequelize");
const logger = require("../logger/logger");

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

const metadata_users = sequelize01.define(
  "metadata_users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      readOnly: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      readOnly: true,
    },
  },
  { timestamps: false }
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
    is_verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
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
    logger.info("Table User Created", { severity: "INFO" });
    //console.log("Table Created");
  })
  .catch((err) => {
    console.log(err);
    logger.error("Table User Not Created", { severity: "ERROR" });
    //console.log("Table Not Created", err);
  });

metadata_users
  .sync({ force: false })
  .then(() => {
    logger.info("Table metadata_users Created", { severity: "INFO" });
    //console.log("Table Created");
  })
  .catch((err) => {
    console.log(err);
    logger.error("Table metadata_users Not Created", { severity: "ERROR" });
    //console.log("Table Not Created", err);
  });

module.exports = { users, metadata_users, sequelize01 };
