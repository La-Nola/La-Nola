import dotenv from "dotenv";
import mongoose from "mongoose";
import data from "./candles.js";
import Candle from "../../models/candleModel.js";

dotenv.config();

/* 
Use the following command to run this file in you terminal:
    * npm run seed

!   NOTE: Your current working directtory should be server
*/

(async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    const candles = data.map((item) => new Candle(item));

    await Candle.deleteMany();
    console.log("Candles data deleted successfuly");

    await Candle.insertMany(candles);
    console.log("Candles data seeded successfuly");
  } catch (error) {
    console.log(`Error while seeding data: ${error}`);
  } finally {
    mongoose.connection.close();
  }
})();
