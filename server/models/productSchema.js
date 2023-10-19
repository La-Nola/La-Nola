import { Schema } from "mongoose";

const commonStringObjs = {
  type: String,
  required: true,
  trim: true,
};

//product schema that is reuse for the 3 different product categories
const productSchema = new Schema({
  productName: commonStringObjs,
  description: { type: String },
  material: [{ type: String }],
  price: { type: String, required: true },
  stock: { type: Number, required: true },
  newProduct: { type: Boolean, required: true },
  isSale: { type: Number },
  category: {
    type: String,
    required: true,
    enum: ["kidsclothes", "candle", "postcard"],
  },
  images: {
    cloudinary: { type: String, required: true },
  },
  colors: [
    {
      type: String,
      required: true,
      enum: [
        "red",
        "green",
        "blue",
        "yellow",
        "orange",
        "purple",
        "pink",
        "brown",
        "gray",
        "black",
        "white",
        "cyan",
        "magenta",
        "teal",
        "gold",
        "silver",
        "violet",
        "indigo",
        "maroon",
        "olive",
        "coral",
        "lime",
        "navy",
        "orchid",
        "peach",
        "turquoise",
        "plum",
        "sienna",
        "slate",
        "wheat",
        "multi",
      ],
    },
  ],
});

export default productSchema.obj;
