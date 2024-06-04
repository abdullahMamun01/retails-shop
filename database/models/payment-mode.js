import mongoose, { Schema } from "mongoose";

// Define the schema for the order
const OrderSchema = new Schema({
  userId: Schema.Types.ObjectId,
  sessionId: String,
  shipping: {
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    country: String,
    postalCode: String,
  },
  orderedItems: [
    {
      productId: Schema.Types.ObjectId,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

// Create the Order model
export const Order =
  mongoose.models.order ?? mongoose.model("order", OrderSchema);
