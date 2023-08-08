"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaderboard_model_1 = __importDefault(require("../models/leaderboard.model"));
const _ = require('lodash');
function getLeadBoardData(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const queriedEntries = yield leaderboard_model_1.default
            .find({ category: payload.category })
            .sort({ wpm: -1 }) // Sort in descending order
            .skip((payload.pageNumber - 1) * payload.perPage) // how many documents to skip
            .limit(payload.perPage); // Limit to top 5 values
        const filteredQueryData = queriedEntries.map((each) => _.pick(each, ["wpm", "username", "Date", "picUrl"]));
        return filteredQueryData;
    });
}
exports.default = getLeadBoardData;
