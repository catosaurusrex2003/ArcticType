import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

//type-note
// export interface noteType extends mongoose.Document {
//   readonly _id: mongoose.Types.ObjectId;
//   title: string;
//   description?: string;
//   readonly createdAt: Date;
//   readonly updatedAt: Date;
// }
//type-user
export interface userType extends mongoose.Document {
  // readonly _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  picUrl: string,
  score:number,
  joiningDate: Date;
  numberOfTests: number;
  totalTime: number;
  records: {
    '15': {
      wpm: number;
      acc: number;
    };
    '30': {
      wpm: number;
      acc: number;
    };
    '60': {
      wpm: number;
      acc: number;
    };
    '120': {
      wpm: number;
      acc: number;
    };
  };
  avg_wpm: number[];

  comparePasswords(email: string, password: string): Promise<userType>;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// Schema-note
// const noteSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String },
//   },
//   { timestamps: true }
// );

// Schema-user
const userSchema = new mongoose.Schema<userType>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picUrl: { type: String, default: "" },
    score:{type:Number , default:0},
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
  },
  { timestamps: true }
);

//Password Encryption
userSchema.pre("save", async function (next) {
  const user = this as userType;
  if (user.isModified("password")) {
    const SALTROUNDS = 9
    user.password = await bcrypt.hash(
      user.password,
      SALTROUNDS
    );
    return next();
  }
  return next();
});

//Verifying Password
userSchema.method(
  "comparePasswords",
  async function (
    inputEmail: string,
    inputPassword: string
  ): Promise<userType> {
    const user: userType | null = await User.findOne({ email: inputEmail });
    if (user) {
      const auth: boolean = await bcrypt.compare(inputPassword, user.password);
      if (!auth) {
        throw Error("Your password is incorrect !!");
      } else {
        return user;
      }
    }
    throw new Error("Your email is not registered !!");
  }
);



const User = mongoose.model<userType>("user", userSchema);



// export const Note = mongoose.model<noteType>("notes", noteSchema);
export default User;
