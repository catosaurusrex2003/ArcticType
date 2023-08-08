import mongoose from "mongoose";

export interface leaderBoardType extends mongoose.Document {
    category: 15 | 30 | 60 | 120;
    wpm: number;
    acc: number;
    Date: string;
    username: string,
    picUrl:string
}

// Schema-user
const leaderBoardSchema = new mongoose.Schema<leaderBoardType>(
    {
        category: {
            type: Number,
            enum: [15, 30, 60, 120],
            required: true,
        },
        wpm: {
            type: Number,
            required: true,
        },
        acc: {
            type: Number,
            required: true,
        },
        Date: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
        },
        picUrl: {
            type: String,
        },
    },
    // { timestamps: true }
);



const leaderBoard = mongoose.model<leaderBoardType>("leaderBoard", leaderBoardSchema);

export default leaderBoard;
