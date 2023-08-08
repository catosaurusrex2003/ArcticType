import { Request, Response } from "express";
import logger from "../utils/logger";
import createNewTest  from "../service/createNewTest";
import newLeadBoardEntry from "../service/newLeaderBoardEntry";

export async function newTestHandler(req: Request, res: Response) {
    try {
        const testUpdatedData = await createNewTest(req.body)
        // send the profilepic url to the put in the leaderboard document
        const entryMade = await newLeadBoardEntry(req.body,testUpdatedData?.picUrl)
        res.status(200).json(testUpdatedData)
    }
    catch (error: any) {
        logger.error(error);
        res.status(400).json({ name: error.name, message: error.message });
    }
}