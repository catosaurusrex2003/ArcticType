import User, { userType } from "../models/user.model";
import _ from "lodash";

export default async function authenticateUser(
  payload: Pick<userType, "email" | "password">
) {
  const user = new User();
  const userInstance = await user.comparePasswords(
    payload.email,
    payload.password
  );
  let result = _.omit(JSON.parse(JSON.stringify(userInstance)), [
    "password",
  ]) as Omit<userType, "password">;
  return result;
}
