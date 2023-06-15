import { Request } from "express";
import Session,{ SessionType } from "../models/session.model";

export async function createSession(req: Request, email: string, refreshToken: string){
    const payload: Pick<SessionType, "email" | "agent" | "ip" | "refreshToken"> = {
        email,
        // ip: "string",
        agent: req.headers["user-agent"],
        refreshToken,
    }
    const k = await Session.findOne({email})

    if (k) {
        return await k.updateOne({refreshToken});
    }
    return await Session.create(payload);
}




// createSession(req,email);