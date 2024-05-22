// models/Medication.js
const mongoose = require('mongoose');

// Define schema for medication details
const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  schedule: {
    type: String,
    required: true
  },
  instructions: String,
  // patient: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Patient',
  //   required: true,
  // },
});

// Create model for interacting with MongoDB
// Medication is model, medications is collection
module.exports = mongoose.model("Medication", medicationSchema, "medications");