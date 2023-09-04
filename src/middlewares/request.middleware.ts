
import { Request, Response, NextFunction } from "express";
// import { requestHeader } from "./../responses/all-constants.response.json";
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import { languageCheckUp } from "./../middlewares/language.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";

export enum RequestStatus {
  processing = "PROCESSING",
  processed = "PROCESSED"
}
export interface ResponseData {
  status: RequestStatus;
  body?: any;
  code?: number;
}

export const middlewares = [
  compression(),
  helmet(),
  cors(),
  languageCheckUp,
  // verifyRequestHeader,
  bodyParser.json({ limit: "50mb" }),
  bodyParser.urlencoded({ extended: false }),
  cookieParser(),
  // morgan(
  //   'Input Request:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" req-Id: :req[x-requested-with] :status :res[content-length] ":referrer" ":user-agent"',
  //   {
  //     stream: new LoggerStream(requestLogger),
  //     skip: (req: express.Request, _res: express.Response) => {
  //       return req.url.includes("metrics");
  //     }
  //   }
  // )
];

export function verifyRequestHeader(request: Request, _response: Response, next: NextFunction) {
  const l = request.headers["content-language"];
  const requestId = request.header("x-requested-with");
  if (requestId) {
    return next();
  }
  next(new Error("Invalid requestID"));
}
