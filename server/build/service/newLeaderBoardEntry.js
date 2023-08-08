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
const { format } = require('date-fns');
const { utcToZonedTime } = require('date-fns-tz');
function newLeadBoardEntry(payload, picUrl = "") {
    return __awaiter(this, void 0, void 0, function* () {
        /*
      
        IF ONLY WANT TOP 5 WPMS PER CATEGORY TO BE IN THE DATABASE
      
        leaderBoard
          .find({ category: payload.stats.time })
          .sort({ wpm: -1 }) // Sort in descending order
          .limit(5) // Limit to top 5 values
          .exec((err, topEntries) => {
            if (err) {
              console.error("Error fetching top entries:", err);
              return;
            }
      
            //   the 5th position wpm in the category of the leaderboard
            const lowestTopWpm =
              topEntries.length > 0 ? topEntries[topEntries.length - 1].wpm : 0;
      
            if (payload.stats.wpm > lowestTopWpm) {
              const newEntry = new leaderBoard({
                category: payload.stats.time,
                wpm: payload.stats.wpm,
                acc: payload.stats.acc,
                username: payload.userName,
              });
              newEntry.save((saveErr, savedEntry) => {
                if (saveErr) {
                  console.error("Error saving entry:", saveErr);
                } else {
                  console.log("Entry saved:", savedEntry);
                }
              });
            } else {
              console.log("New entry does not meet wpm requirement. It does not fall in top 5");
            }
          });
          */
        // ALL THE TEST STORE IN THE DATABASE
        const currentDate = new Date();
        const timeZone = 'Asia/Kolkata';
        const istDate = utcToZonedTime(currentDate, timeZone);
        const formattedDate = format(istDate, "do MMM yyyy");
        const newEntry = new leaderboard_model_1.default({
            category: payload.stats.time,
            wpm: payload.stats.wpm,
            acc: payload.stats.acc,
            username: payload.userName,
            Date: formattedDate,
            picUrl: picUrl
        });
        newEntry.save((err, savedEntry) => {
            if (err) {
                console.error('Error saving entry:', err);
                return false;
            }
            else {
                return true;
            }
        });
    });
}
exports.default = newLeadBoardEntry;
