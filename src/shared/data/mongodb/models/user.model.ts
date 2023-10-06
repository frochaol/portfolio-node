import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
});

export const UserModel = mongoose.model("User", userSchema);
