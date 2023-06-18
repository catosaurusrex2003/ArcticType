import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import jwt from "jsonwebtoken";
import config from "config";
import { signAccessToken, signRefreshToken } from "../utils/signToken";
import logger from "../utils/logger";


// Schema
// export const validateRequest = (schema: AnyZodObject) => 
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync({
//         body: req.body,
//         query: req.query,
//         params: req.params,
//       });
//       return next();
//     } catch (error) {
//       res.status(400).json(error);
//     }
//   };

export function validateRequest(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      })
      return next();
    } catch (error) {
      res.status(400).json(error)
    }
  }
}


///Cookie  
//Types
type CookieType = {
  accessToken: string;
  refreshToken: string;
};
type TokenPayloadType = {
  id: string;
  iat: number;
  exp: number;
};

// const PRIVATE_KEY = String(process.env.PRIVATE_KEY)
const PRIVATE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
// const PRIVATE_REFRESH_KEY = String(process.env.PRIVATE_REFRESH_KEY)
const PRIVATE_REFRESH_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"


export function validateCookie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { accessToken, refreshToken }: CookieType = req.cookies;
    //Verify Access Token
    jwt.verify(accessToken, PRIVATE_KEY, (error: jwt.VerifyErrors | null, decoded) => {
      if (!error) {
        const { id } = decoded as TokenPayloadType;
        //@ts-ignore
        req.userEmail = id;
        return next();

      } else if (error?.name === "TokenExpiredError") {
        //Verify Refresh Token

        const { id } = jwt.verify(refreshToken, PRIVATE_REFRESH_KEY) as TokenPayloadType;

        //Sign new cookies
        signAccessToken(res, id);
        signRefreshToken(res, id);

        logger.info("Tokens upadated");
        //@ts-ignore
        req.userEmail = id;
        return next();
      } else {
        console.log(error.message)
        throw error;
      }
    }
    );
  } catch (error: any) {
    res.status(400).json({ name: error.name, message: error.message });
  }
}


