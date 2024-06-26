// require express
const express = require("express");

//require cors
const cors = require("cors");

//require cookie-parser
const cookieParser = require("cookie-parser");

// require morgan for logs
const morgan = require("morgan");

//import user router
const userRouter = require("./user/userRoutes");
//import medication router
const medicationRouter = require("./medication/medicationRoutes");
// const notificationRoutes = require("./notification/notificationRoutes");
const patientRouter = require("./patient/patientRoutes");
// create an express application
const app = express();

//enable cors requests from http://localhost:5173
app.use(
  cors({
    origin: "https://fsd56wde-mernovation-medgaurd-fe.netlify.app", 
    // origin: "http://localhost:5173", 
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
app.use("/api/medications", medicationRouter);
// app.use("/api/notifications", notificationRoutes);
app.use("/api/patients", patientRouter);

// export the app module
module.exports = app;
