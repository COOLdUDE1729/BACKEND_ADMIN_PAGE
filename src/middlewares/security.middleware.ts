import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
// import { logger } from "./../config/logger.config";

const secret = process.env.ACCESS_TOKEN_SECRET?? "d9c88113b44bc263987cac0c544ef3ea8c97c14811b50bbe24f91528a8e7c2f447754105852849b1dc18fc48e8e4add3466e6eaee9640278c219f743dc8d955f"; 


export const generateToken = (req: Request, res: Response, next: NextFunction, user) => {
  const token = jwt.sign({ id: user._id, type: user.role, access_level: user.access_level }, secret, {
    algorithm: 'HS256',
    expiresIn: '24h'
  });
  return token;
};


export async function securityCheck(request: Request, _response: Response, next: NextFunction) {
  const l = request.headers["content-language"];
  const header = request.headers.authorization; // Express headers are auto converted to lowercase
  if (header && header.startsWith("Bearer ")) {
    const token = header.slice(7, header.length);
      // const token = request.cookies.jwt;
      console.log(token)
      try {
        jwt.verify(token, secret);
        next();
      } catch (error) {
        // logger.error({ error });
        if (error.name === "TokenExpiredError") {
          return next(new Error("UnAuthorised af"));
        }
        return next(new Error("UnAuthorised"));
      }
    }
    else {
    return next(new Error("User not logged in"));
  }
}

// export async function verifyMqttClient(accessToken: string) {
//   return jwt.verify(accessToken, process.env.PRIVATE_KEY);
// }
