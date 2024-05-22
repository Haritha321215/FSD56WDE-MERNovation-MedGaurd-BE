// import the express router
const express = require("express");
const notificationRouter = express.Router();
const notificationController = require("./notificationController");
const auth = require("../middleware/auth")
// define the end points

// notificationRouter.post("/register", auth.verifyToken, notificationController.addUser);
notificationRouter.post("/send", auth.verifyToken, notificationController.sendNotification); 
notificationRouter.get("/", auth.verifyToken, notificationController.getNotifications); 



//export the router
module.exports = notificationRouter;
