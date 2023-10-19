import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const commonStringObjs = {
  type: String,
  required: true,
  trim: true,
};

const orderSchema = new Schema({
  order: { type: Object },
  cartId: { type: Schema.Types.ObjectId, ref: "Cart" },
  items: [],
});

const userSchema = new Schema({
  firstName: commonStringObjs,
  lastName: commonStringObjs,
  dateOfBirth: commonStringObjs,
  email: { ...commonStringObjs, unique: true },
  password: { type: String, required: true },
  passwordConfirm: { type: String },
  cartId: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Kidsclothes",
    },
    {
      type: Schema.Types.ObjectId,
      ref: "Candle",
    },
    {
      type: Schema.Types.ObjectId,
      ref: "Postcard",
    },
  ],
  orders: [orderSchema],
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
});

// before any user will be saved to the database, mongodb will check if the password was modified and hash it as well as delete the password confirm
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }
  next();
});

// method for checking if the entered password and stored password match
userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

export default model("User", userSchema);
