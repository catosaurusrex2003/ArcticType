"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTextHandler = void 0;
const generateText_1 = require("../utils/generateText");
const generateTextHandler = (req, res) => {
    try {
        var text;
        switch (req.body.type) {
            case "basic":
                text = (0, generateText_1.generateBasicText)(req.body.length, req.body.cat);
                break;
            case "punc":
                text = (0, generateText_1.generatePuncText)(req.body.length, req.body.cat);
                break;
            case "num":
                text = (0, generateText_1.generateNumText)(req.body.length, req.body.cat);
                break;
            case "both":
                text = (0, generateText_1.generateBothText)(req.body.length, req.body.cat);
                break;
            default:
                text = (0, generateText_1.generateBasicText)(req.body.length, req.body.cat);
                break;
        }
        if (text) {
            res.status(200).send(text);
        }
        else {
            res.status(400).json({ error: "couldnt make text", message: "couldnt make text" });
        }
    }
    catch (err) {
        console.log("err is :", err);
        res.status(400).json({ error: err, message: err.message });
    }
};
exports.generateTextHandler = generateTextHandler;
