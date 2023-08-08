"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {
//   addNoteHandler,
//   removeNoteHandler,
// } from "./controller/notes.controller";
const user_controller_1 = require("./controller/user.controller");
const validator_1 = require("./middleware/validator");
// import { AddNotesZodSchema, RemoveNotesZodSchema } from "./schema/notes.schema";
const newTest_controller_1 = require("./controller/newTest.controller");
const user_schema_1 = require("./schema/user.schema");
const newTest_schema_1 = require("./schema/newTest.schema");
const changePfp_schema_1 = require("./schema/changePfp.schema");
const changePfp_controller_1 = require("./controller/changePfp.controller");
const getLeaderBoard_schema_1 = require("./schema/getLeaderBoard.schema");
const getLeaderBoard_controller_1 = require("./controller/getLeaderBoard.controller");
function routes(app) {
    app.get("/", [
        (req, res) => {
            return res.status(200).send("working");
        },
    ]);
    //heathcheck route
    app.get("/healthCheck", [
        (req, res) => {
            return res.status(200).send("Hello World");
        },
    ]);
    //Create a new user
    app.post("/createUser", [
        (req, res, next) => { console.log("createUser"); return next(); },
        (0, validator_1.validateRequest)(user_schema_1.CreateUserZodSchema),
        user_controller_1.createUserHandler,
    ]);
    //Login a user
    app.post("/loginUser", [
        (req, res, next) => { console.log("loginUser"); return next(); },
        (0, validator_1.validateRequest)(user_schema_1.LoginUserZodSchema),
        user_controller_1.loginUserHandler,
    ]);
    // is Logged in
    // if the jwt is verified. it will send the whole user data
    app.get("/isLoggedin", [
        (req, res, next) => { console.log("verifying jwt"); return next(); },
        validator_1.validateCookie,
        // sending status back
        // (req: Request, res: Response, next: NextFunction) => { console.log("user is legit"); res.status(200).send("legit user") },
        user_controller_1.getUserHandler
    ]);
    //Get user data
    app.get("/getUser", [
        (req, res, next) => { console.log("getUser"); return next(); },
        validator_1.validateCookie,
        user_controller_1.getUserHandler
    ]);
    // when user makes a new test
    app.post("/newTest", [
        (req, res, next) => { console.log("newTest"); return next(); },
        (0, validator_1.validateRequest)(newTest_schema_1.NewTestZodSchema),
        validator_1.validateCookie,
        newTest_controller_1.newTestHandler
    ]);
    // when user changes pfp
    app.post("/changePfp", [
        (req, res, next) => { console.log("changePfp"); return next(); },
        (0, validator_1.validateRequest)(changePfp_schema_1.changePfpZodSchema),
        validator_1.validateCookie,
        changePfp_controller_1.changePfpHandler
    ]);
    // when user changes pfp
    app.get("/getLeaderBoard", [
        (req, res, next) => { console.log("getLeaderBoard"); return next(); },
        (0, validator_1.validateRequest)(getLeaderBoard_schema_1.getleaderBoardZodSchema),
        // validateCookie,
        getLeaderBoard_controller_1.getLeaderBoardHandler
    ]);
    //Logout a user
    app.get("/logoutUser", [
        (req, res, next) => { console.log("logoutUser"); return next(); },
        user_controller_1.logoutUserHandler
    ]);
}
exports.default = routes;
