import { Schema, model } from "mongoose";
import User from "../interfaces/user.interface";

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    lastName1: {
      type: String,
      required: true,
    },
    lastName2: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    zone: {
      type: String,
    },
    station: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default model("User", userSchema);
