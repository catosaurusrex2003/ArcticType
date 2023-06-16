"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sessionSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    agent: { type: String, required: true },
    ip: { type: String },
    refreshToken: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });
const Session = mongoose_1.default.model("session", sessionSchema);
// const abc = new session();
exports.default = Session;
