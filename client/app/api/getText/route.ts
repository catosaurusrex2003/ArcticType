import { NextResponse } from "next/server"
import { generateBasicText, generateNumText, generatePuncText, generateBothText } from "./generateText"


export async function POST (req: Request, res: Response){
    try {
        const body = await req.json()
        var text: string
        switch (body.type) {
            case "basic":
                text = generateBasicText(body.length, body.cat)
                break
            case "punc":
                text = generatePuncText(body.length, body.cat)
                break
            case "num":
                text = generateNumText(body.length, body.cat)
                break
            case "both":
                text = generateBothText(body.length, body.cat)
                break
            default:
                text = generateBasicText(body.length, body.cat)
                break
        }
        if (text) {
            // res.status(200).send(text) 
            return NextResponse.json({text:text})
        }
        else {
            // res.status(400).json({ error: "couldnt make text", message: "couldnt make text" })
            return NextResponse.json({error:"couldnt make text",message:"couldnt make text"})
        }
    }
    catch (err: any) {
        console.log("err is :", err)
        // res.status(400).json({ error: err, message: err.message })
        return NextResponse.json({ error: err, message: err.message })
    }
}

