// business logic

// import the patient model
const Patient = require("./patientModel");
const Medication = require("../medication/medicationModel");
const User = require('../user/userModel')
//define the patient controller
const patientController = {
  addPatient: async (request, response) => {
    try {
      const { name, caregivername, medicationName } = request.body;
      console.log( name, caregivername, medicationName);
      const patient = await Patient.findOne({ name });
      if (patient) {
        return response.status(400).json({ message: "Patient already exists" });
      }

      const user = await User.findOne({ caregivername });
      if (!user) {
        return response.status(400).json({ message: "Caregiver is not found" });
      }

      const medication = await Medication.findOne({ medicationName });
      if (!medication) {
        return response
          .status(400)
          .json({ message: "medication is not found" });
      }
      const newPatient = new Patient({
        name,
        caregiver: user._id,
        medications: medication._id,
      });
      const savePatient = await newPatient.save();

      await Patient.collection.dropIndexes();
      response.status(201).json({
        message: "Patient created successfully",
        patient: savePatient,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  getpatientById: async (request, response) => {
    try {
      // get the patient id  from the request object
      const patientId = request.params.patientId;
      // find the patient by id from the database
      const patient = await Patient.findById(patientId);

      // if the patient does nt exist, return an error
      if (!patient) {
        return response.status(400).json({ message: "Patient not found" });
      }
      //if the patient found
      response.json({ message: "patient found", patient });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  getPatients: async (request, response) => {
    try {
      // find the patients from the database
      // const patients = await Patient.find({ caregiver: caregiverId }).populate( "medications");
      const patients = await Patient.find();

      // if the patients does nt exist, return an error
      if (!patients) {
        return response.status(400).json({ message: "Patients not found" });
      }
      //if the patient found
      response.json({ message: "patients found", patients });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  updatePatientById: async (request, response) => {
    try {
      // get the patient id  from the request object
      const patientId = request.params.patientId;
      // get patient inprequest.params.patientIdestbody
      const { name } = request.body;

      // find the patient by id from the database
      const patient = await Patient.findById(patientId);

      // if the patient does not exist, return an error
      if (!patient) {
        return response.status(400).json({ message: "Patient not found" });
      }

      // update the patient if the patient exists
      if (name) patient.name = name;
      //save the updated patient to the database
      const updatedPatient = await patient.save();

      //return the updated patient to front end
      response.json({
        message: "patient updated",
        patient: updatedPatient,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  deletePatientnById: async (request, response) => {
    try {
      // get the patient id  from the request object
      const patientId = request.params.patientId;

      // find the patient by id from the database
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return response.status(400).json({ message: "Patient not found" });
      }

      //if the patient found, then delete the patient
      await patient.deleteOne();

      //return a suscess message
      response.json({ message: "patient has been deleted" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = patientController;
