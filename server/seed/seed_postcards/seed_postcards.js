import dotenv from "dotenv";
import mongoose from "mongoose";
import data from "./postcards.js";
import Postcard from "../../models/postcardModel.js";

dotenv.config();

/* 
Use the following command to run this file in you terminal:
    * npm run seed

!   NOTE: Your current working directtory should be server
*/

(async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    const postcards = data.map((item) => new Postcard(item));

    await Postcard.deleteMany();
    console.log("Postcard data deleted successfuly");

    await Postcard.insertMany(postcards);
    console.log("Postcard data seeded successfuly");
  } catch (error) {
    console.log(`Error while seeding data: ${error}`);
  } finally {
    mongoose.connection.close();
  }
})();
