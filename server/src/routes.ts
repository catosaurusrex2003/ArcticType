import { Express, NextFunction, Request, Response } from "express";
// import {
//   addNoteHandler,
//   removeNoteHandler,
// } from "./controller/notes.controller";
import {
  createUserHandler,
  getUserHandler,
  loginUserHandler,
  logoutUserHandler,
} from "./controller/user.controller";
import { validateRequest, validateCookie } from "./middleware/validator";
// import { AddNotesZodSchema, RemoveNotesZodSchema } from "./schema/notes.schema";
import { CreateUserZodSchema, LoginUserZodSchema } from "./schema/user.schema";

export default function routes(app: Express) {


  app.get("/", [
    (req: Request, res: Response) => {
      return res.status(200).send("working");
    },
  ]);
  //heathcheck route
  app.get("/healthCheck", [
    (req: Request, res: Response) => {
      return res.status(200).send("Hello World");
    },
  ]);

  //Create a new user
  app.post("/createUser", [
    (req: Request, res: Response, next: NextFunction) => { console.log("createUser"); return next() },
    validateRequest(CreateUserZodSchema),
    createUserHandler,
  ]);

  //Login a user
  app.post("/loginUser", [
    (req: Request, res: Response, next: NextFunction) => { console.log("loginUser"); return next() },
    validateRequest(LoginUserZodSchema),
    loginUserHandler,
  ]);

  // is Logged in
  app.get("/isLoggedin", [
    (req: Request, res: Response, next: NextFunction) => { console.log("verifying jwt"); return next() },
    validateCookie,
    // sending status back
    (req: Request, res: Response, next: NextFunction) => { console.log("user is legit"); res.status(200).send("legit user") },
  ]);

  //Get user data
  app.get("/getUser", [
    (req: Request, res: Response, next: NextFunction) => { console.log("getUser"); return next() },
    validateCookie,
    getUserHandler
  ]);

  //Add a new note
  // app.post("/addNote", [
  //   validateCookie,
  //   validateRequest(AddNotesZodSchema),
  //   addNoteHandler,
  // ]);

  //Remove a new note
  // app.delete("/removeNote/:id", [
  //   validateCookie,
  //   validateRequest(RemoveNotesZodSchema),
  //   removeNoteHandler,
  // ]);

  //Logout a user
  app.get("/logoutUser", [
    (req: Request, res: Response, next: NextFunction) => { console.log("logoutUser"); return next() },
    logoutUserHandler
  ]);
}
