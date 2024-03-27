const winston = require("winston");
console.log(process.env.NODE_ENV);
const logger = winston.createLogger({
  level: "silly",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename:
        process.env.NODE_ENV == "test"
          ? "combined.log"
          : "/var/log/webapp/combined.log",
    }),
    ///var/log/webapp/
  ],
});

module.exports = logger;
