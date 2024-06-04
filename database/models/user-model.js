import mongoose, { Schema } from "mongoose";
import { Address } from "./address-model";


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address format",
    },
  },

  password: {
    type: String,
    required: true,
    min: 6,
    max: 10,
  },
  shipping: {
    type: Address,
    default : null

  },
  billing: {
    type: Address,
    default : null
  },
});

export const UserModel =
  mongoose.models.users ?? mongoose.model("users", UserSchema);
