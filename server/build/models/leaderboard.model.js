"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Schema-user
const leaderBoardSchema = new mongoose_1.default.Schema({
    category: {
        type: Number,
        enum: [15, 30, 60, 120],
        required: true,
    },
    wpm: {
        type: Number,
        required: true,
    },
    acc: {
        type: Number,
        required: true,
    },
    Date: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    picUrl: {
        type: String,
    },
});
const leaderBoard = mongoose_1.default.model("leaderBoard", leaderBoardSchema);
exports.default = leaderBoard;
