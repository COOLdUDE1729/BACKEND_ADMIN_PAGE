import express from "express";
import mongoose from "mongoose";
// import { logger } from "./config/logger.config";
import { MainRoute } from "./api/routes/main.routes";
import { middlewares } from "./middlewares/request.middleware";
import bodyParser from "body-parser";
import  methodOverride  from "method-override";

import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export class App {
  public app: express.Application;

  constructor() {
    console.info("creating app instance");
    this.app = express();
    this.app.use(middlewares);
    this.app.use("", MainRoute.register());
    this.app.use(bodyParser.json());
    this.app.use(methodOverride('_method'));


  }

  setupDatabase(dbName?: string) {
    return mongoose
      .connect(
        process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/trialshop"
        // ,{dbName}
      )
      .then(() => {
        console.info("Connected to the database");
      })
      .catch((error) => {
        console.error({ error });
        process.exit(1);
      });
  }
}
