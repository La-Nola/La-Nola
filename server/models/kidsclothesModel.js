import { Schema, model } from "mongoose";
import productSchema from "./productSchema.js";

// kidsclothes schema that uses the product schema but is also extended by subcategories related to kidsclothes and sizes
const kidsclothesSchema = new Schema({
  ...productSchema,
  subcategory: {
    type: String,
    required: true,
    enum: [
      "jacken",
      "westen",
      "overalls",
      "pullover",
      "walkhosen",
      "kordhosen",
      "jerseyhosen",
      "musselinhosen",
      "latzhosen",
      "babyschuhe",
      "muetzen",
      "upcycling",
    ],
  },
  sizes: [
    {
      type: String,
      required: true,
      enum: [
        "0-3 M (56/62)",
        "3-6 M (62/68)",
        "6-9 M (68/74)",
        "9-12 M (74/80)",
        "12-18 M (80/86)",
      ],
    },
  ],
});
export default model("Kidsclothes", kidsclothesSchema);
