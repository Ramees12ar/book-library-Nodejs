import mongoose from "mongoose";
import config from "./config.mjs";
import logger from "../logger.mjs";

mongoose.set("debug", false);
mongoose.set("strictQuery", false);
if (process.env.NODE_ENV === "test") {
    mongoose.connect(config.test_database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((conn) => {
        logger.info("test backend db connected")
    }).catch((err) => {
        logger.error("test backend db not connected")
    });
} else {
    mongoose.connect(config.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((conn) => {
        logger.info("Backend db connected")
    }).catch((err) => {
        logger.error("Backend db not connected")
    });
}
export default mongoose;
