import dotenv from "dotenv";
import mongoose from "mongoose";
import data from "./kidsclothes.js";
import Kidsclothes from "../../models/kidsclothesModel.js";

dotenv.config();

/* 
Use the following command to run this file in you terminal:
    * npm run seed

!   NOTE: Your current working directtory should be server
*/

(async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    const kidsclothes = data.map((item) => new Kidsclothes(item));

    await Kidsclothes.deleteMany();
    console.log("Kids clothes data deleted successfuly");

    await Kidsclothes.insertMany(kidsclothes);
    console.log("Kids clothes data seeded successfuly");
  } catch (error) {
    console.log(`Error while seeding data: ${error}`);
  } finally {
    mongoose.connection.close();
  }
})();
