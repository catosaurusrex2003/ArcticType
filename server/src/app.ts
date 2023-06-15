import express from "express";
import config from "config";  
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import connectToDB from "./utils/connect";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(errorHandler);

routes(app);

const PORT = config.get<number>("PORT");
const MODE = config.get<string>("MODE");

connectToDB();

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    logger.info(`${MODE} server is up on port ${PORT}`);
  });
});
