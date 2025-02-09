import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const Workshop = mongoose.model("Workshop", workshopSchema);

export default Workshop;
