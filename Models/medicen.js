import mongoose from "mongoose";

const medicenSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter medicen title"],
  },
  price: {
    type: Number,
    required : [true, "please enter a price"],
  },
  link:{
    type:String,
    required: [true , 'please add medicen link'],
  },
  img:{
    type: String,
    required: [true, "please enter an image"],
  },
});

const Medicen =
  mongoose.models.Medicen || mongoose.model("Medicen", medicenSchema);

export default Medicen;
