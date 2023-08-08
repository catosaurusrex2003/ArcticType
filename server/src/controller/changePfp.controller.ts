import { Request, Response } from "express";
import logger from "../utils/logger";
import changePfp from "../service/changePfp";
// import createNewTest , {newTestPayloadType} from "../service/createNewTest";

export async function changePfpHandler(req: Request, res: Response) {
    try {
        // const testUpdatedData = await create(req.body)
        const bool = changePfp(req.body)
        res.status(200).json({message:"done"})
    }
    catch (error: any) {
        logger.error(error);
        res.status(400).json({ name: error.name, message: error.message });
    }
}