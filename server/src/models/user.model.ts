import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

//type-note
export interface noteType extends mongoose.Document {
  readonly _id: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
//type-user
export interface userType extends mongoose.Document {
  // readonly _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  notes: noteType[];
  comparePasswords(email: string, password: string): Promise<userType>;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// Schema-note
const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

// Schema-user
const userSchema = new mongoose.Schema<userType>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    notes: {
      type: [noteSchema],
      // default: undefined,
    },
  },
  { timestamps: true }
);

//Password Encryption
userSchema.pre("save", async function (next) {
  const user = this as userType;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(
      user.password,
      config.get<string>("SALTROUNDS")
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
    // console.log(user);
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
