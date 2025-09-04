import mongoose from "mongoose";

const landSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneno: { type: String, required: true },
    area: { type: String, required: true },   // Area name
    price: { type: String, required: true },  // Land price
    description: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export const Land = mongoose.model("Land", landSchema);
