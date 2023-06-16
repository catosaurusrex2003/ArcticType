"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
exports.default = (0, pino_1.default)({
    transport: {
        target: "pino-pretty",
        options: {
            ignore: "pid,hostname",
            customColors: "error:red,warn:yellow,info:blue",
            // translateTime: false,
        },
    },
    timestamp: () => `,"time":"${new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}"`,
});
