import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongoDB Connected");
  } catch (error) {
    console.log("Mongodb connect error", error);
    process.exit(1);
  }
}

export default connectDB;
