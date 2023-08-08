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
exports.getLeaderBoardHandler = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const getLeaderBoardData_1 = __importDefault(require("../service/getLeaderBoardData"));
function getLeaderBoardHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = {
                category: parseInt(req.query.category),
                pageNumber: parseInt(req.query.pageNumber),
                perPage: parseInt(req.query.perPage),
            };
            const data = yield (0, getLeaderBoardData_1.default)(payload);
            res.status(200).json(data);
        }
        catch (error) {
            logger_1.default.error(error);
            res.status(400).json({ name: error.name, message: error.message });
        }
    });
}
exports.getLeaderBoardHandler = getLeaderBoardHandler;
