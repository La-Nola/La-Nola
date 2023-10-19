import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

//ROUTES
import kidsclothesRouter from "./routes/kidsclothesRouter.js";
import usersRouter from "./routes/usersRouter.js";
import candlesRouter from "./routes/candlesRouter.js";
import postcardsRouter from "./routes/postcardsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import authRouter from "./routes/authRouter.js";
import {
  globalErrorHandler,
  routeNotFound,
} from "./middlewares/errorHandlers.js";

//Load environment
dotenv.config();

//create express server
const app = express();

//setting up middlewares
app.use(cookieParser());

app.use(express.json({ limit: "1MB" }));
app.use(
  cors({
    origin: [
      "https://la-nola-backend.onrender.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

//setting up routes
app.use("/kidsclothes", kidsclothesRouter);
app.use("/users", usersRouter);
app.use("/candles", candlesRouter);
app.use("/postcards", postcardsRouter);
app.use("/auth", authRouter);
app.use("/carts", cartRouter);

//^ Error handling middlewares
app.use(routeNotFound);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const uri = process.env.DB_URI;

mongoose.connect(uri);
mongoose.connection
  .on("error", console.error)
  .on("open", () =>
    console.log(`Conntected to MongoDB / ${mongoose.connection.name}`)
  );
