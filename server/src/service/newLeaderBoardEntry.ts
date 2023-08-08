import leaderBoard from "../models/leaderboard.model";
const { format } = require('date-fns');
const { utcToZonedTime } = require('date-fns-tz');

interface newLeadBoardEntryPayloadType {
  userEmail: string;
  userName: string;
  stats: {
    time: 15 | 30 | 60 | 120;
    wpm: number;
    acc: number;
    type: "basic" | "punc" | "num" | "both";
    retest: boolean;
  };
}

export default async function newLeadBoardEntry(
  payload: newLeadBoardEntryPayloadType,
  picUrl:string =  ""
) {
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
  const newEntry = new leaderBoard({
    category: payload.stats.time,
    wpm: payload.stats.wpm,
    acc: payload.stats.acc,
    username: payload.userName,
    Date: formattedDate,
    picUrl:picUrl
  });
  newEntry.save((err, savedEntry) => {
    if (err) {
      console.error('Error saving entry:', err);
      return false
    } else {
      return true
    }
  });

}
