import { Request, Response } from "express";
import logger from "../utils/logger";
import createNewTest , {newTestPayloadType} from "../service/createNewTest";

export async function handleNewTest(req: Request, res: Response) {
    try {
        const testUpdatedData = await createNewTest(req.body)
        res.status(200).json(testUpdatedData)
    }
    catch (error: any) {
        logger.error(error);
        res.status(400).json({ name: error.name, message: error.message });
    }
}