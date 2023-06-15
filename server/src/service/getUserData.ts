import User, { userType } from "../models/user.model";
import _ from "lodash";

export default async function getUserData(email: string) {
  const temp = await User.findOne({ email });
  return _.omit(JSON.parse(JSON.stringify(temp)), "password") as Omit<userType, "password">
}
