import { Request, Response } from "express";
import logger from "../utils/logger";
import getLeadBoardData from "../service/getLeaderBoardData";

interface getLeadBoardDataPayloadType {
    category: number,
    pageNumber: number,
    perPage: number
}


export async function getLeaderBoardHandler(req: Request, res: Response) {
    try {
        const payload: getLeadBoardDataPayloadType = {
            category: parseInt(req.query.category as string),
            pageNumber: parseInt(req.query.pageNumber as string),
            perPage: parseInt(req.query.perPage as string),
        };

        const data = await getLeadBoardData(payload)

        res.status(200).json(data)
    }
    catch (error: any) {
        logger.error(error);
        res.status(400).json({ name: error.name, message: error.message });
    }
}