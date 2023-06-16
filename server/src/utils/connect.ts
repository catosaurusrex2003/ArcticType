import mongoose from "mongoose";
import logger from "./logger";
import config from "config";

mongoose.set("strictQuery", false);
const connectToDB = async () => {
  try {
    const DBURI1 = process.env.DBURI as string
    await mongoose.connect(DBURI1);
    logger.info("Connection to database successful");
  } catch (error: any) {
    logger.error(error.message);
  }
};

export default connectToDB;
