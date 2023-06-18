"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Schema-note
// const noteSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String },
//   },
//   { timestamps: true }
// );
// Schema-user
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picUrl: { type: String, default: "" },
    joiningDate: {
        type: Date,
        default: Date.now
    },
    numberOfTests: {
        type: Number,
        default: 0
    },
    totalTime: {
        type: Number,
        default: 0
    },
    records: {
        '15': {
            wpm: {
                type: Number,
                default: 0
            },
            acc: {
                type: Number,
                default: 0
            }
        },
        '30': {
            wpm: {
                type: Number,
                default: 0
            },
            acc: {
                type: Number,
                default: 0
            }
        },
        '60': {
            wpm: {
                type: Number,
                default: 0
            },
            acc: {
                type: Number,
                default: 0
            }
        },
        '120': {
            wpm: {
                type: Number,
                default: 0
            },
            acc: {
                type: Number,
                default: 0
            }
        },
    },
    avg_wpm: {
        type: [Number],
    }
}, { timestamps: true });
//Password Encryption
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password")) {
            const SALTROUNDS = 9;
            user.password = yield bcrypt_1.default.hash(user.password, SALTROUNDS);
            return next();
        }
        return next();
    });
});
//Verifying Password
userSchema.method("comparePasswords", function (inputEmail, inputPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User.findOne({ email: inputEmail });
        if (user) {
            const auth = yield bcrypt_1.default.compare(inputPassword, user.password);
            if (!auth) {
                throw Error("Your password is incorrect !!");
            }
            else {
                return user;
            }
        }
        throw new Error("Your email is not registered !!");
    });
});
const User = mongoose_1.default.model("user", userSchema);
// export const Note = mongoose.model<noteType>("notes", noteSchema);
exports.default = User;
