import winston from "winston";
import { resolve } from "path";

const LOG_FILE_PATH = resolve(__dirname, "logger.info");

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: LOG_FILE_PATH })
    ]
});

export default logger;