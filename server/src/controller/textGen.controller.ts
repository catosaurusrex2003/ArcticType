import { Request, Response } from "express";
import { generateBasicText, generatePuncText, generateNumText, generateBothText } from "../utils/generateText";



export const generateTextHandler = (req: Request, res: Response) => {
    try {
        var text: string
        switch (req.body.type) {
            case "basic":
                text = generateBasicText(req.body.length,req.body.cat)
                break
            case "punc":
                text = generatePuncText(req.body.length,req.body.cat)
                break
            case "num":
                text = generateNumText(req.body.length,req.body.cat)
                break
            case "both":
                text = generateBothText(req.body.length,req.body.cat)
                break
            default:
                text = generateBasicText(req.body.length,req.body.cat)
                break
        }
        if (text) {
            res.status(200).send(text)
        }
        else {
            res.status(400).json({ error: "couldnt make text", message: "couldnt make text" })
        }
    }
    catch (err: any) {
        console.log("err is :", err)
        res.status(400).json({ error: err, message: err.message })
    }
}