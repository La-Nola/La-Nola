import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../../models/userModel.js";
import { faker } from "@faker-js/faker";

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    await User.deleteMany();
    console.log("Users purged");

    const { person, location, internet, helpers, date } = faker;

    const users = Array.from(
      { length: 10 },
      () =>
        new User({
          firstName: person.firstName(),
          lastName: person.lastName(),
          dateOfBirth: faker.date
            .birthdate({ min: 12, max: 130, mode: "age" })
            .toISOString()
            .split("T")[0],
          email: internet.exampleEmail(),
          password: "test1234",
          passwordConfirm: "test1234",
          cartId: new mongoose.Types.ObjectId(),
          role: helpers.arrayElement(["user", "admin"]),
          shippingAddress: {
            street: location.street(),
            streetNumber: location.buildingNumber(),
            city: location.city(),
            zipCode: location.zipCode(),
            country: location.country(),
          },
          billingAddress: {
            street: location.street(),
            streetNumber: location.buildingNumber(),
            city: location.city(),
            zipCode: location.zipCode(),
            country: location.country(),
          },
          isVerified: true,
          isLoggedIn: false,
        })
    );

    await User.create(users);
    console.log("Users data seeded successfully!");
  } catch (error) {
    console.error("Error while seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
})();
