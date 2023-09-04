import express from "express";
import { App } from "./app";
import mongoose from "mongoose";
import   Grid  from 'gridfs-stream';
// import { logger } from "./config/logger.config";

// import * as dotenv from "dotenv";
// dotenv.config({ path: ".env" });

const appInstance: App = new App();


// Setting up the port for the server
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 7000;
// Firing up the server
appInstance
  .setupDatabase()
  .then((_) => {
    const app: express.Application = appInstance.app;
    app.listen(port, async () => {
      console.info(`Server is running ❤️ at localhost :${port}`);
 
    });
  })
  .catch((error) => {
    console.error({ error });
    process.exit(1);
  });

  const conn = mongoose.connection;
  let gfs;
  conn.once("open", function () {
      gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection("uploads");
  });
  


