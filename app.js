// require express
const express = require("express");

//require cors
const cors = require("cors");

//require cookie-parser
const cookieParser = require("cookie-parser");

// require morgan fpr logs
const morgan = require("morgan");

//import user router
const userRouter = require("./user/userRoutes");

// create an express application
const app = express();

//enable cors requests from http://localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

// use morgan to log requests to the console
app.use(morgan("dev"));

//use cookie parser
app.use(cookieParser());

// we need to enable the express application to parse json
app.use(express.json());

//define the end points
app.use("/api/users", userRouter);

// export the app module
module.exports = app;
