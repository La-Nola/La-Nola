import createError from "http-errors";
import mongoose from "mongoose";

// middleware to throw an error for duplicate fields in mongo DB (in our case duplicate emails)
export const duplicateFieldsHandler = (keyValue) => {
  const field = Object.keys(keyValue)[0];
  return createError(`${field} is already exist`);
};

// middleware to check if the provided id is a valid mongoose ID
export const isValidId = (req) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw createError("The provided ID sucks.");
  }
};

// middleware to check if the product was deleted from the DB
export const isOldId = (product) => {
  if (product === null)
    throw createError(
      404,
      `Sorry, the product you are trying to find doesn't exist anymore.`
    );
};

// authentication error handler
export const authError = (statusCode, message) => {
  throw createError(statusCode, message);
};

// error for non existing routes
export const routeNotFound = (req, res, next) => {
  const newError = createError(404, "Resource not found");
  next(newError);
};

// global error handler when all other errorhandlers fail
export const globalErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    statusCode: err.statusCode,
    type:
      err.status === 500
        ? "server error"
        : err.stack.split(":")[0].replace(/([a-z])([A-Z])/g, "$1 $2"),
    message: err.message,
    stack: err.stack,
  });
};



//to handle errors in sendVerificationEmail without repeating the the same code
export const handleEmailError = (res, error) => {
  return res.status(500).send({
    error: error.message,
    msg: "Technical Issue! Please click on resend to verify your Email.",
  });
};