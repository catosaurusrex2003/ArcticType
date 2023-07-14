import { Response } from "express";
import config from "config";
import jwt from "jsonwebtoken";

//signAccessToken fnc
export function signAccessToken(res: Response, id: string) {
  const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
  const token = jwt.sign({ id }, PRIVATE_KEY, { expiresIn: "1800s" });
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: true,
    maxAge: 3600000, // 1 hr
    
  });
}
// maxAge: 20000, //20 sec
// maxAge: 172800000, // 2days

//signRefreshToken fnc
export function signRefreshToken(res: Response, id: string): string {
  const PRIVATE_REFRESH_KEY = process.env.PRIVATE_REFRESH_KEY as string;
  const token = jwt.sign({ id }, PRIVATE_REFRESH_KEY, { expiresIn: "1y",});
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: true,
    maxAge: 172800000, // 2days
  });
  return token;
}



// expiresIn: "1y"