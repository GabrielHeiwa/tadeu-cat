"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var path_1 = require("path");
var LOG_FILE_PATH = path_1.resolve(__dirname, "logger.info");
var logger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.File({ filename: LOG_FILE_PATH })
    ]
});
exports.default = logger;
