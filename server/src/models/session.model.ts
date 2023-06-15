import mongoose from "mongoose";

export interface SessionType extends mongoose.Document {
  email: string;
  agent?: string;
  ip?: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionType>(
  {
    email: { type: String, required: true, unique: true },
    agent: { type: String, required: true },
    ip: { type: String },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model<SessionType>("session", sessionSchema);

// const abc = new session();
export default Session;
