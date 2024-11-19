import winston from "winston";

const { combine, timestamp, printf } = winston.format;

const logger = winston.createLogger({
  level: "debug",
  format: combine(
    timestamp(),
    printf((info) => `${info.timestamp} ${info.level} ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/application.log" }),
  ],
});

export default logger;

