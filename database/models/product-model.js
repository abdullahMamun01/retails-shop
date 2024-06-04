import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: [String],
    quantity: {
      type: Number,
      required: true,
    },
    brand: String,
    inStock: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: [Number],
      min: 0,
      max: 5,
      default: 0,
    },
    sizes: [String],
    sizeVariant: [
      {
        size: String,
        price: Number,
        quantity: Number,
        color: String,
        sku: String,
        quantity: Number,
        discountPercentage: Number,
        inStock: Boolean,
        image: String,
      }
    ],
  },
  { timestamps: true }
);



export const ProductModel =
  mongoose.models.products ?? mongoose.model("products", productSchema);
