import User, { userType } from "../models/user.model";
import { scoreTable } from "../config/scoreWeight";

export interface newTestPayloadType {
    userEmail: string;
    stats: {
        time: 15 | 30 | 60 | 120;
        wpm: number;
        acc: number;
        type: "basic" | "punc" | "num" | "both",
        retest: boolean
    }
}

export default async function createNewTest(payload: newTestPayloadType) {
    const score = scoreTable[payload.stats.time][payload.stats.type][payload.stats.retest ? 'retest' : 'normal']
    const testUpdatedData = await User.findOneAndUpdate(
        { email: payload.userEmail },
        [
            {
                $set: {
                    // update wpm only if greater than before
                    [`records.${payload.stats.time}.wpm`]: { $max: ['$records.15.wpm', payload.stats.wpm] },
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
        ],
        { new: true }
    ).exec();
    return testUpdatedData
}


