import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: { type: String, required: true },
  //expireAt: { type: Date, default: Date.now, index: { expires: 600000 } },

});

export default model("Token", tokenSchema);
