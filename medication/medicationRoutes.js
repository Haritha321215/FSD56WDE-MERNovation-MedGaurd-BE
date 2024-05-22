// import the express router
const express = require("express");
const medicationRouter = express.Router();
const medicationController = require("./medocationController");
const auth = require("../middleware/auth");
// define the end points

medicationRouter.post(
  "/addMedication",
  auth.verifyToken,
  medicationController.addMedication
);
medicationRouter.get(
  "/:medicationId",
  auth.verifyToken,
  medicationController.getMedicationById
);
medicationRouter.get(
  "/",
  auth.verifyToken,
  medicationController.getMedications
);
medicationRouter.put(
  "/:medicationId",
  auth.verifyToken,
  medicationController.updateMedicationById
);
medicationRouter.delete(
  "/:medicationId",
  auth.verifyToken,
  medicationController.deleteMedicationById
);

//export the router
module.exports = medicationRouter;
