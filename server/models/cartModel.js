import { Schema, model } from "mongoose";

// cart schema that can be populated with the 3 different product types depending on the product type in the request body
const cartSchema = new Schema({
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        refPath: "items.productType",
      },
      productType: {
        type: String,
        enum: ["Kidsclothes", "Postcard", "Candle"],
      },
      quantity: {
        type: Number,
      },
      totalPrice: {
        type: Number,
      },
      size: [
        {
          size: String,
          quantity: Number,
        },
      ],
    },
  ],
});

export default model("Cart", cartSchema);
