import express from "express";
import config from "config";  
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import connectToDB from "./utils/connect";
import routes from "./routes";
const cors = require('cors');
require('dotenv').config()

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:["http://localhost:3000","https://fuschia-racer.vercel.app/"]
}))
// app.use(errorHandler);

routes(app);
const PORT = process.env.PORT
const MODE = process.env.MODE

connectToDB();

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    logger.info(`${MODE} server is up on port ${PORT}`);
  });
});
