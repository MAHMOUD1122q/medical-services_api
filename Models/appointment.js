import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add blog name"],
  },
  mobile: {
    type: Number,
    required: [true, "please add mobile"],
  },
  email: {
    type: String,
    required: [true, "please add email"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  doctorName:{
    type: String,
  },
  appointmentTime:{
    type:String
  },
    appointmentDay:{
    type:String
  }
});

const appointment =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default appointment;
