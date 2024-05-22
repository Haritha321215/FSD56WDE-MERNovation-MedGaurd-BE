const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  caregiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  medications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medication',
  }],
});

module.exports = mongoose.model('Patient', PatientSchema);