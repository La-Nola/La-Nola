import express from "express";
import {
  confirmEmail,
  requestPasswordReset,
  resendLink,
  resetPassword,
} from "../controllers/authController.js";
import validatePassword from "../middlewares/validatePassword.js";

const router = express.Router();

// route for resending verification emails
router.route("/verification").post(resendLink);

// route that will be hit be the link in the confirmation email
router.route("/verification/:email/:token").get(confirmEmail);

// route for requesting a password reset
router.route("/requestResetPassword").post(requestPasswordReset);

// route that will be hit by link in password reset mail. includes token and userid in url that need to be extracted in FE
// also the user will have to enter his new password and confirm it
router.route("/resetPassword").post(validatePassword, resetPassword);

export default router;
