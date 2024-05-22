// business logic

// import the medication model
const Medication = require("./medicationModel");

//define the medication controller
const medicationController = {
  addMedication: async (request, response) => {
    try {
      const { name, dosage, schedule, instructions } = request.body;
      console.log(name, dosage, schedule, instructions);
    
      // checks if the medication is already in the database
      // need to create medication model
      const medication = await Medication.findOne({ name });
      // if medication exits, return an error
      //other wise create new medication object and save it in db
      if (medication) {
        return response
          .status(400)
          .json({ message: "Medication already exists" });
      }
      // if medication does not exits create new medication
      const newMedication = new Medication({
        name,
        dosage,
        schedule,
        instructions,
      });
      console.log(newMedication);
      // save the medication in database
      const saveMedication = await newMedication.save();

      await Medication.collection.dropIndexes();
      // return the saved medication respose to the front end
      response.status(201).json({
        message: "medication created successfully",
        medication: saveMedication,
      });
    } catch (error) {
      console.log("failed in adding medication");
      response.status(500).json({ message: error.message });
    }
  },

  getMedicationById: async (request, response) => {
    try {
      // get the medication id  from the request object
      const medicationId = request.params.medicationId;
      // find the medication by id from the database
      const medication = await Medication.findById(medicationId);

      // if the medication does nt exist, return an error
      if (!medication) {
        return response.status(400).json({ message: "Medication not found" });
      }
      //if the medication found
      response.json({ message: "medication found", medication });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  getMedications: async (request, response) => {
    try {
      // find the medications from the database
      const medications = await Medication.find();

      // if the medications does nt exist, return an error
      if (!medications) {
        return response.status(400).json({ message: "Medications not found" });
      }
      //if the medication found
      response.json({ message: "medications found", medications });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  updateMedicationById: async (request, response) => {
    try {
      // get the medication id  from the request object
      const medicationId = request.params.medicationId;
      // get medication inprequest.params.medicationIdestbody
      const { name,dosage, schedule,instructions } = request.body;

      // find the medication by id from the database
      const medication = await Medication.findById(medicationId);

      // if the medication does not exist, return an error
      if (!medication) {
        return response.status(400).json({ message: "Medication not found" });
      }

      // update the medication if the medication exists
      if (name) medication.name = name;
      if (dosage) medication.dosage = dosage;
      if (schedule) medication.schedule = schedule;
      if (instructions) medication.instructions = instructions;

      //save the updated medication to the database
      const updatedMedication = await medication.save();

      //return the updated medication to front end
      response.json({
        message: "medication updated",
        medication: updatedMedication,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  deleteMedicationById: async (request, response) => {
    try {
      // get the medication id  from the request object
      const medicationId = request.params.medicationId;

      // find the medication by id from the database
      const medication = await Medication.findById(medicationId);
      if (!medication) {
        return response.status(400).json({ message: "Medication not found" });
      }

      //if the medication found, then delete the medication
      await medication.deleteOne();

      //return a suscess message
      response.json({ message: "medication has been deleted" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = medicationController;
