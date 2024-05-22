// business logic

// import the medication model
const Notification = require("./notificationModel");
const User = require('../user/userModel');
const Patient = require('../patient/patientModel');
const { sendNotification } = require("./notificationService");

//define the medication controller
const notificationController = {
  // addUser: async (request, response) => {
  //   const { name, username, password, fcmToken } = request.body;
  //   try {
  //     let user = await User.findOne({ email });
  //     if (user) {
  //       user.fcmToken = fcmToken; // Update FCM token if user already exists
  //     } else {
  //       user = new User({ name, username, password, fcmToken });
  //     }
  //     await user.save();
      
  //     res.status(201).json({ message: 'User registered successfully', userId: user._id });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // },

  sendNotification: async (request, response) => {
    const { patientId, title, body } = request.body;
  
    try {
      const patient = await Patient.findById(patientId).populate('caregiver');
      
      if (patient && patient.caregiver) {
        await sendNotification(patient.caregiver.fcmToken, title, body);
        
        const notification = new Notification({
          patient: patientId,
          title,
          body,
        });
        await notification.save();
        
        response.status(200).json({ message: 'Notification sent successfully' });
      } else {
        response.status(404).json({ message: 'Patient or caregiver not found' });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Server error' });
    } 
  },
  getNotifications: async (request, response) => {
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
 
};

module.exports = notificationController;
