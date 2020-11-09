const path = require("path");

const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { logger, morgan } = require("./config/logger");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const studiesRouter = require("./routes/studies");


logger.debug("NODE_ENV=" + process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: path.join(__dirname, ".env.production") });
} else if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const app = express();

const connect = () => {
  mongoose.connection
    .on("error", () => logger.error("database connection error"))
    .on("disconnected", connect)
    .once("open", () => logger.info("database connection success"));
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

connect();

app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/studies", studiesRouter);



module.exports = app;
