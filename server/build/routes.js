"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {
//   addNoteHandler,
//   removeNoteHandler,
// } from "./controller/notes.controller";
const user_controller_1 = require("./controller/user.controller");
const validator_1 = require("./middleware/validator");
// import { AddNotesZodSchema, RemoveNotesZodSchema } from "./schema/notes.schema";
const user_schema_1 = require("./schema/user.schema");
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
    app.get("/isLoggedin", [
        (req, res, next) => { console.log("verifying jwt"); return next(); },
        validator_1.validateCookie,
        // sending status back
        (req, res, next) => { console.log("user is legit"); res.status(200).send("legit user"); },
    ]);
    //Get user data
    app.get("/getUser", [
        (req, res, next) => { console.log("getUser"); return next(); },
        validator_1.validateCookie,
        user_controller_1.getUserHandler
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
        (req, res, next) => { console.log("logoutUser"); return next(); },
        user_controller_1.logoutUserHandler
    ]);
}
exports.default = routes;
