import { check, validationResult } from "express-validator";

const fieldValidation = (value) => {
  return check(value).notEmpty().withMessage(`${value} is required`);
};

const validateInput = [
  check("firstName")
    .notEmpty()
    .withMessage("First Name is Required")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 character"),

  check("lastName")
    .notEmpty()
    .withMessage("Last Name is Required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 3 and 50 character"),

  check("dateOfBirth")
    .notEmpty()
    .withMessage("Date of Birth is required")
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Invalid Date of Birth")
    .custom((value) => {
      const modifiedValue = value.replace(/\//g, "-");
      const date = new Date(modifiedValue);
      const minAgeDate = new Date();
      minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);
      if (date <= minAgeDate) {
        return true;
      }
      throw new Error("You must be at least 18 years old.");
    }),

  check("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Email Address"),

  check("password")
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .custom((value) => {
      // Check for at least one special character
      if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value)) {
        throw new Error("Password must contain at least one special character");
      }

      // Check for at least one uppercase letter
      if (!/[A-Z]/.test(value)) {
        throw new Error("Password must contain at least one uppercase letter");
      }

      // Check for at least one number
      if (!/\d/.test(value)) {
        throw new Error("Password must contain at least one number");
      }

      // If all checks pass, the password is valid
      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password Confirm is Required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .custom((value, { req }) => {
      if (value == req.body.password) {
        return true;
      }
      throw new Error("Password do not match");
    }),

  (req, res, next) => {
    const results = validationResult(req);

    results.isEmpty()
      ? next()
      : res.status(422).json({ errors: results.errors });
  },
];

export default validateInput;
