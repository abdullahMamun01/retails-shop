const mongoose = require('mongoose');

// Define the schema
const AccountSchema = new mongoose.Schema({
  access_token: {
    type: String,
    description: 'OAuth access token.',
    required: true
  },
  id_token: {
    type: String,
    description: 'ID token (if applicable).',
    required: false
  },
  refresh_token: {
    type: String,
    description: 'OAuth refresh token (if applicable).',
    required: false
  },
  expires_at: {
    type: Number,
    description: 'Timestamp when the access token expires.',
    required: true
  },
  scope: {
    type: String,
    description: 'OAuth scopes granted.',
    required: true
  },
  token_type: {
    type: String,
    description: "Type of token (e.g., 'Bearer').",
    required: true
  },
  providerAccountId: {
    type: String,
    description: "Provider's unique identifier for the account.",
    required: true
  },
  provider: {
    type: String,
    description: "Name of the provider (e.g., 'google').",
    required: true
  },
  type: {
    type: String,
    description: "Type of account (e.g., 'oauth').",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    description: 'Reference to the user in the users collection.',
    required: true
  }
});

// Create the model
export const Account =mongoose.models.accounts ?? mongoose.model('accounts', AccountSchema);


