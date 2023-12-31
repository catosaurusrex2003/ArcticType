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
exports.newTestHandler = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const createNewTest_1 = __importDefault(require("../service/createNewTest"));
const newLeaderBoardEntry_1 = __importDefault(require("../service/newLeaderBoardEntry"));
function newTestHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const testUpdatedData = yield (0, createNewTest_1.default)(req.body);
            // send the profilepic url to the put in the leaderboard document
            const entryMade = yield (0, newLeaderBoardEntry_1.default)(req.body, testUpdatedData === null || testUpdatedData === void 0 ? void 0 : testUpdatedData.picUrl);
            res.status(200).json(testUpdatedData);
        }
        catch (error) {
            logger_1.default.error(error);
            res.status(400).json({ name: error.name, message: error.message });
        }
    });
}
exports.newTestHandler = newTestHandler;
