import { Request, Response, NextFunction } from "express";
import User, { noteType } from "../models/user.model";

export async function addNoteHandler(req: Request, res: Response) {
  try {
    const { title, description } = req.body as Pick< noteType, "title" | "description">;
    //@ts-ignore
    const email: string = req.userEmail;

    const user = await User.findOne({ email });
    if (user) {
    // @ts-ignore
      user.notes = [{ title, description }, ...user.notes];
      const {notes} = await user.save();
      return res.status(200).json(notes);
    }
   
    return res.sendStatus(401);
  } catch (error: any) {
    res.status(400).json({ name: error.name, message: error.message });
  }
}

export async function removeNoteHandler(req: Request, res: Response) {
  try {
    //@ts-ignore
    const email: string = req.userEmail;
    const _id: string = req.params.id;

    const user = await User.findOne({ email });
    if (user) {
      user.notes = removeNote(user.notes, _id);
      await user.save();
      return res.status(200).json(user.notes);
    }
    return res.status(401);
  } catch (error: any) {
    res.status(400).json({ name: error.name, message: error.message });
  }
}

function removeNote(arr: noteType[], id: string) {
  return arr.filter((note) => {
    return note.id !== id;
  });
}
