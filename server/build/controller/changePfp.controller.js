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
exports.changePfpHandler = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const changePfp_1 = __importDefault(require("../service/changePfp"));
// import createNewTest , {newTestPayloadType} from "../service/createNewTest";
function changePfpHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const testUpdatedData = await create(req.body)
            const bool = (0, changePfp_1.default)(req.body);
            res.status(200).json({ message: "done" });
        }
        catch (error) {
            logger_1.default.error(error);
            res.status(400).json({ name: error.name, message: error.message });
        }
    });
}
exports.changePfpHandler = changePfpHandler;
