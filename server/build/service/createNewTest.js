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
const user_model_1 = __importDefault(require("../models/user.model"));
const scoreWeight_1 = require("../config/scoreWeight");
function createNewTest(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const score = scoreWeight_1.scoreTable[payload.stats.time][payload.stats.type][payload.stats.retest ? 'retest' : 'normal'];
        const testUpdatedData = yield user_model_1.default.findOneAndUpdate({ email: payload.userEmail }, [
            {
                $set: {
                    // update wpm only if greater than before
                    [`records.${payload.stats.time}.wpm`]: { $max: [`$records.${payload.stats.time}.wpm`, payload.stats.wpm] },
                    // update acc only if wpm is greater
                    [`records.${payload.stats.time}.acc`]: {
                        $cond: {
                            if: { $gt: [`$records.${payload.stats.time}.wpm`, payload.stats.wpm] },
                            then: `$records.${payload.stats.time}.acc`,
                            else: payload.stats.acc
                        }
                    },
                    // increment
                    numberOfTests: { $add: ['$numberOfTests', 1] },
                    score: { $add: ['$score', score] },
                    totalTime: { $add: ['$totalTime', payload.stats.time] },
                    // push the wpm
                    avg_wpm: { $concatArrays: ['$avg_wpm', [payload.stats.wpm]] }
                }
            }
        ], { new: true }).exec();
        return testUpdatedData;
    });
}
exports.default = createNewTest;
