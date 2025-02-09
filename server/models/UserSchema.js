import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  image: {
    type: String,
    required: false,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  address_details: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "address",
    },
  ],
  shopping_cart: [
    {
      productname: String,
      price: Number,
    },
  ],
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
