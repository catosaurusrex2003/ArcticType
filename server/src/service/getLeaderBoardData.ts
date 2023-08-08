import leaderBoard from "../models/leaderboard.model";
const _ = require('lodash');

interface getLeadBoardDataPayloadType {
  category: number,
  pageNumber: number,
  perPage: number
}

export default async function getLeadBoardData(
  payload: getLeadBoardDataPayloadType
) {
  const queriedEntries = await leaderBoard
    .find({ category: payload.category })
    .sort({ wpm: -1 }) // Sort in descending order
    .skip((payload.pageNumber - 1)*payload.perPage) // how many documents to skip
    .limit(payload.perPage) // Limit to top 5 values

  const filteredQueryData = queriedEntries.map((each) => _.pick(each,["wpm","username","Date","picUrl"]));

  return filteredQueryData

}
