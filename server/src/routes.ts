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
import { newTestHandler } from "./controller/newTest.controller";
import { CreateUserZodSchema, LoginUserZodSchema } from "./schema/user.schema";
import { NewTestZodSchema } from "./schema/newTest.schema";
import { changePfpZodSchema } from "./schema/changePfp.schema";
import { changePfpHandler } from "./controller/changePfp.controller";
import { getleaderBoardZodSchema } from "./schema/getLeaderBoard.schema";
import { getLeaderBoardHandler } from "./controller/getLeaderBoard.controller";

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
  // if the jwt is verified. it will send the whole user data
  app.get("/isLoggedin", [
    (req: Request, res: Response, next: NextFunction) => { console.log("verifying jwt"); return next() },
    validateCookie,
    // sending status back
    // (req: Request, res: Response, next: NextFunction) => { console.log("user is legit"); res.status(200).send("legit user") },
    getUserHandler
  ]);

  //Get user data
  app.get("/getUser", [
    (req: Request, res: Response, next: NextFunction) => { console.log("getUser"); return next() },
    validateCookie,
    getUserHandler
  ]);

  // when user makes a new test
  app.post("/newTest",[
    (req: Request, res: Response, next: NextFunction) => { console.log("newTest"); return next() },
    validateRequest(NewTestZodSchema),
    validateCookie,
    newTestHandler
  ])

  // when user changes pfp
  app.post("/changePfp",[
    (req: Request, res: Response, next: NextFunction) => { console.log("changePfp"); return next() },
    validateRequest(changePfpZodSchema),
    validateCookie,
    changePfpHandler
  ])

  // when user changes pfp
  app.get("/getLeaderBoard",[
    (req: Request, res: Response, next: NextFunction) => { console.log("getLeaderBoard"); return next() },
    validateRequest(getleaderBoardZodSchema),
    // validateCookie,
    getLeaderBoardHandler
  ])

  //Logout a user
  app.get("/logoutUser", [
    (req: Request, res: Response, next: NextFunction) => { console.log("logoutUser"); return next() },
    logoutUserHandler
  ]);
}
