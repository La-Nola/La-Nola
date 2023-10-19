import { check, validationResult } from "express-validator";

const sanitizeInput = [
  check("firstName").trim().escape(),
  check("lastName").trim().escape(),
  check("dateOfBirth").trim().escape(),
  check("email").trim().escape().normalizeEmail({ gmail_remove_dots: false }),
  check("password").escape(),
  check("passwordConfirm").escape(),

  (req, res, next) => {
    const results = validationResult(req);

    results.isEmpty()
      ? next()
      : res.status(422).json({ errors: results.errors });
  },
];

export default sanitizeInput;
