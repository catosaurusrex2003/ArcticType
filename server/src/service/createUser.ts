import User, { userType } from "../models/user.model";
import _ from "lodash";

export default async function createUser(
  payload: Pick<userType, "username" | "email" | "password">
) {
  const user = await User.create(payload);
  const result = _.omit(JSON.parse(JSON.stringify(user)), [
    "password",
    "__v",
  ]) as Pick<userType, "_id" | "username" | "email">;
  return result;
}

// <userType, keyof userType>
