

const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  streetAddress: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postal: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phone: {
    type: String
  }
});



export const Address = addressSchema;

