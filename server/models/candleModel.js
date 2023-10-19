import { Schema, model } from "mongoose";
import productSchema from "./productSchema.js";
// candle schema that uses the product schema but is also extended by subcategories related to candles
const candleSchema = new Schema({
  ...productSchema,
  subcategory: {
    type: String,
    required: true,
    enum: [
      "osterkerzen",
      "hochzeitskerzen",
      "geburts-taufkerzen",
      "grußkerzen",
      "adventskerzen",
      "weihnachtskerzen",
      "stabkerzen",
      "gedenkkerzen",
    ],
  },
});

export default model("Candle", candleSchema);
