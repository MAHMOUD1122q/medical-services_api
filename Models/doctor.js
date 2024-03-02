import mongoose from "mongoose";

const doctorSchema = mongoose.Schema({
  name:{
    type: String,
    required: [true, "please add doctor name"],
  },
  specialization:{
    type: String,
    required: [true, "please add doctor specialization"],
  },
  schedule:{
    type:Object,
    required: [true, "please add doctor schedule"],
  },
  img:{
    type: String,
    required: [true, "please add doctor img"],
  },
},);

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
