const winston = require("winston");

const logger = winston.createLogger({
  level: "silly",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "/var/log/webapp/combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;