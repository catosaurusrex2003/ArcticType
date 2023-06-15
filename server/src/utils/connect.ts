import mongoose from "mongoose";
import logger from "./logger";
import config from "config";

mongoose.set("strictQuery", false);
const connectToDB = async () => {
  try {
    await mongoose.connect(config.get<string>("DBURI"));
    logger.info("Connection to database successful");
  } catch (error: any) {
    logger.error(error.message);
  }
};

export default connectToDB;
