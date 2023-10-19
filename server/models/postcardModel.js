import { Schema, model } from "mongoose";
import productSchema from "./productSchema.js";

// postcard schema that uses the product schema but is also extended by subcategories related to postcards
const postcardSchema = new Schema({
  ...productSchema,
  subcategory: {
    type: String,
    required: true,
    enum: [
      "grusskarten",
      "tiermotive",
      "koerper",
      "blumenmotive",
      "herbst, weihnachten",
    ],
  },
});

export default model("Postcard", postcardSchema);
