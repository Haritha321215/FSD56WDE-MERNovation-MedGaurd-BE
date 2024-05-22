// import the express router
const express = require("express");
const patientRouter = express.Router();
const patientController = require("./patientController");
const auth = require("../middleware/auth")
// define the end points

patientRouter.post("/addPatient", auth.verifyToken, patientController.addPatient);
patientRouter.get("/:patientId", auth.verifyToken, patientController.getpatientById); 
patientRouter.get("/", auth.verifyToken, patientController.getPatients); 
patientRouter.put("/:patientId",  auth.verifyToken, patientController.updatePatientById); 
patientRouter.delete("/:patientId", auth.verifyToken, patientController.deletePatientnById); 



//export the router
module.exports = patientRouter;
