// Importing dependencies

// used for creating jwt tokens
import jwt from "jsonwebtoken";
//used for creating csrf tokens to prevent session abuse
import Tokens from "csrf";
// used for encrypting tokens
import crypto from "crypto";
import { promisify } from "util";
import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import Cart from "../models/cartModel.js";
import {
  authError,
  duplicateFieldsHandler,
  handleEmailError,
} from "../middlewares/errorHandlers.js";
// used to enable .env file
import dotenv from "dotenv";
// used for encrypting tokens
import bcrypt from "bcryptjs";
import successHandler from "../middlewares/successHandler.js";
// allows you to send emails using Node.js.
import nodemailer from "nodemailer";
// provides functions for interacting with the file system.
import fs from "fs";
// provides utilities for working with file and directory paths.
import path from "path";
// templates for email confirmation
import { link, resend } from "./email/templates/template.js";

// Enable .env file
dotenv.config();

// Initiate csrf tokens
const tokens = new Tokens();
const csrfSecret = tokens.secretSync();

// create JWT token with user._id from mongodb
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

//remove all cookies
const removeCookies = (res, ...cookies) => {
  cookies.forEach((cookie) => res.clearCookie(cookie));
};

//extract a specific cookieName from cookies
const extractCookie = (cookieStr, cookieName) => {
  if (!cookieStr) return null;

  const cookieItem = cookieStr
    .split("; ")
    .find((item) => item.startsWith(`${cookieName}=`));

  // decoding cookieItem, and splitting it at equal signs to extract actual value of the cookieName Key
  return cookieItem ? decodeURIComponent(cookieItem.split("=")[1]) : null;
};

// Create and save token in cookies
const createSendToken = (user, statusCode, res) => {
  // create token using userID
  const jwtToken = signToken(user._id);
  // create random csrf token
  const csrfToken = tokens.create(csrfSecret);
  //set cookieoptions
  const cookieOptions = {
    //expires in 1 day
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000
    ),
    // makes the cookie accessible only by https protocol. prevents cookietheft due to cross-site scripting
    httpOnly: true,
    // browser only return cookie when connection is SSL protected. prevents cookietheft from connection eavesdropping
    secure: process.env.NODE_ENV === "production",
    // if in production env, cookies are sent on both originating and cross-site requests (secure = true needed)
    sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
  };

  //sending cookies in the response obj
  res.cookie("jwtToken", jwtToken, cookieOptions);
  res.cookie("csrfToken", csrfToken, cookieOptions);
  //remove password so that it is not sent in response
  user.password = undefined;
  //send all data as json in the response obj
  res.status(statusCode).json({
    message: "success",
    success: true,
    status: statusCode,
    user,
  });
};

//sends a verification email to a new user
const sendVerificationEmail = (req, res, newUser, token) => {
  //path to the email template
  const templatePath = path.join(
    new URL("./email/templates/emailTemplate.html", import.meta.url).pathname
  );
  //transporter for sending emails using nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASSWORD,
    },
  });

  //read the HTML template file
  fs.readFile(templatePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return handleEmailError(res, err);
    }

    // replace placeholders in the template with data
    const emailContent = data
      .replace("{{firstName}}", req.body.firstName)
      .replace("{{email}}", req.body.email)
      .replace(
        "{{verifyLink}}",
        `http://${req.headers.host}/auth/verification/${newUser.email}/${token.token}`
      );

    //object with details for the email
    const mailOptions = {
      from: "no-reply@lanola.com",
      to: newUser.email,
      subject: "Account Verification Link",
      html: emailContent,
    };

    //send the email using the transporter
    transporter.sendMail(mailOptions, (sendMailErr) => {
      if (sendMailErr) {
        return handleEmailError(res, sendMailErr);
      }

      return res
        .status(200)
        .send(
          "A verification email has been sent to " +
            newUser.email +
            ". It will expire after one day. If you did not receive the verification email, click on resend token."
        );
    });
  });
};

// create cart for the user
const createCart = async (user) => {
  // check if user already has a cart
  if (user.cartId) return;
  // create new Cart
  const newCart = await Cart.create({});
  // assign it to user
  user.cartId = newCart._id;
  //save user
  await user.save();
};

//signup function triggered by registration of user
//! https://<host>/users/signup
/* req body from frontend:
  {
    "firstName":"",
    "lastName": "",
    "dateOfBirth": "",
    "password": "",
    "passwordConfirm": "",
    "email":"",
    "shippingAddress": {
                        "street": "",
                        "streetNumber":"",
                        "city": " ",
                        "zipCode": "",
                        "country": ""
                        },
    "billingAddress": {
                        "street": "",
                        "streetNumber":"",
                        "city": "",
                        "zipCode": "",
                        "country": ""
                        }
}
 */

export const signup = async function (req, res, next) {
  try {
    // check if user exists in DB
    const user = await User.findOne({ email: req.body.email });
    // if user exists, throw error
    if (user) {
      throw authError(
        400,
        "This email address is already associated with another account."
      );
      // else check if the user tried to sent a req to become admin. if the user did, check if the used email is stored in env file as permitted admins
    } /* else if (
      req.body.role === "admin" &&
      !process.env.ADMINS.includes(req.body.email)
    )
    // if usermail is not in env file, throw error
      throw authError(403, "Go ask the cool admins boyyyy."); */ else {
      // else create new user
      const newUser = await User.create(req.body);
      createCart(newUser);

      // generate jwt token, encrypt it and save it to Token DB
      const jwtToken = await Token.create({
        _userId: newUser._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      await jwtToken.save();
      // call the function to send the verification email using the newUser data and jwtToken for creating the verification link
      sendVerificationEmail(req, res, newUser, jwtToken);
      // successHandler(res, 200, newUser);
    }
    // catch any errors
  } catch (error) {
    // if the error has code 11000 which is a mongoDB error code, call duplicatesFieldHandler middleware
    if (error.code === 11000) {
      return next(duplicateFieldsHandler(error.keyValue));
    }
    // pass error to errorHandler middleware
    next(error);
  }
};

// controller to check the verification process and confirm the user email
// triggered by clicking link in verification email
//! https://<host>/auth/verification/:<user.email>/:<token>
export const confirmEmail = async function (req, res, next) {
  try {
    //find token
    const token = await Token.findOne({ token: req.params.token });

    //if no token is found or if the token has expired
    if (!token || token.expiryDate < Date.now()) {
      // send a response with a message and a link to resend the verification email
      return res
        .status(400)
        .send(
          resend(
            "Your verification link may have expired or is invalid. Please click on resend to verify your Email.",
            `http://${req.headers.host}/auth/verification/`,
            "Resend",
            req.params.email
          )
        );
    }

    // If the token is valid,find a user in database with a matching id and maile
    else {
      const user = await User.findOne({
        _id: token._userId,
        email: req.params.email,
      });

      // If no user is found, send a response with a link to sign up
      if (!user) {
        return res
          .status(401)
          .send(
            link(
              "We were unable to find a user for this verification. Please SignUp!",
              "http://localhost:3000/signup",
              "Sign Up"
            )
          );
      }
      //If the user is already verified, send a response with a link to login.
      else if (user.isVerified) {
        return res
          .status(200)
          .send(
            link(
              "User has been already verified. Please Login.",
              "http://localhost:3000/login",
              "Login"
            )
          );
      }
      //If the user is not yet verified, set 'isVerified' to true and send a link to login.
      else {
        user.isVerified = true;
        user.save();
        return res
          .status(200)
          .send(
            link(
              "Your account has been successfully verified.",
              "http://localhost:3000/login",
              "Login"
            )
          );
      }
    }
  } catch (error) {
    next(error);
  }
};

// controller to send a new verification email\
//! https://<host>/auth/verification
/* req body from frontend:
  {
  "email": ""
} */
export const resendLink = async function (req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    // user not found in DB
    if (!user) {
      throw authError(
        400,
        "We were unable to find a user with that email. Make sure your Email is correct!"
      );
    }
    // user already verified
    else if (user.isVerified) {
      return res
        .status(200)
        .send("This account has been already verified. Please log in.");
    }
    // send verification link
    else {
      // generate token with userid, encrypt and save
      const jwtToken = await Token.create({
        _userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      await jwtToken.save();
      // use controller to send email
      sendVerificationEmail(req, res, user, jwtToken);
      //res.status(200).send('Verification email has been resent.');
    }
    // catch and pass error
  } catch (error) {
    next(error);
  }
};

// controller for user login
//! https://<host>/users/login
/* req body from frontend:
{
  "email": "",
  "password": ""
}
*/
export const login = async (req, res, next) => {
  try {
    // extract email and password from req body and check if either is missing
    const { email, password } = req.body;
    if (!email || !password)
      throw authError(400, "Please provide email and password");

    // find corresponding user for the entered email and check if password matches the password in DB
    const user = await User.findOne({ email });
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw authError(401, "Incorrect email or password");
    }
    // check if user is actually verified
    // if (!user.isVerified) {
    //   throw authError(
    //     401,
    //     "Your email has not been verified. Please verify the account by clicking on the link we sent you or click 'resend' to get a new verification link."
    //   );
    // }
    // set users login status to true
    // user.isLoggedIn = true;
    await user.save();
    // call function to create and send tokens
    createSendToken(user, 201, res);
    // call successhandler
    // successHandler(res, 200, user);
    // catch errors
  } catch (error) {
    next(error);
  }
};

// user logout controller
//! http://<host>/users/logout
/* req body from frontend:
{
  "email": ""
}
 */
export const logout = async (req, res, next) => {
  try {
    const { email } = req.body;
    // remove all security cookies from user
    removeCookies(res, "jwtToken");
    removeCookies(res, "csrfToken");
    // find user in DB and update the login status to false
    await User.findOneAndUpdate(
      { email },
      { isLoggedIn: false },
      {
        new: true,
      }
    );
    // call successHandler middleware
    successHandler(res, 200, "Logged out successfully.");
    // catch and pass errors
  } catch (error) {
    next(error);
  }
};

// protect middleware used to protect specific routes that should be accessible to logged in users only
/* export const protect = async (req, res, next) => {
  try {
    let jwtToken = req.cookies["jwtToken"];
    // extract jwt cookie from request header
    // if (req.headers.cookie) {
    //   jwtToken = extractCookie(req.headers.cookie, "jwtToken");
    // }
    // deny access when jwt cookie not found
    if (!jwtToken) {
      throw authError(
        401,
        "You do not have the permission to do that. Please log in."
      );
    }
    // decode cookie and find corresponding user by the userid stored in the cookie

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    // if there is no matching user, deny access
    if (!user) {
      throw authError(
        401,
        "You do not have the permission to do that. Please log into your account."
      );
    }
    // if there is a user, set authentication status of the request to true and call the next middleware ( for example cart handling controllers )
    req.user = user;
    req.isAuthenticated = true;

    next();
    // catch errors and make sure that authentication status is false
  } catch (error) {
    console.log("running");
    next(error);
  }
}; */

export const protect = async (req, res, next) => {
  try {
    const jwtToken = req.cookies["jwtToken"];

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    if (!decoded.id) throw authError(401, "Invalid token");

    const user = await User.findById(decoded.id);
    if (!user) throw authError(401, "User not found.");

    req.user = user;
    req.isAuthenticated = true;

    next();
  } catch (error) {
    next();
  }
};

// middleware to verify csrf token
export const verifyCSRFToken = (req, res, next) => {
  try {
    // get the token from cookies
    const csrfTokenCookie = req.cookies["csrfToken"];
    // verify token with csrf verification from npm package
    if (!tokens.verify(csrfSecret, csrfTokenCookie)) {
      throw authError(403, "Invalid CSRF token.");
    }
    next();
  } catch (error) {
    next(error);
  }
};

// load user profile when logged in
//! http://<host>/users/me
export const getMe = (req, res, next) => {
  try {
    res.status(200).json({
      message: "success",
      user: req.user,
      isAuthenticated: req.isAuthenticated,
      jwtToken: req.cookies["jwtToken"],
      csrfToken: req.cookies["csrfToken"],
    });
  } catch (error) {
    next(error);
  }
};

// middleware to restrict some actions to specific roles. in our case admins
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // check if the role of the logged in user is matching the restrictions specified in the params of the middleware on the routes
    if (!roles.includes(req.user.role))
      throw authError(
        403,
        "You do not have permission to perform this action."
      );
    // even if the user should have gotten access to admin status, check again, whether the users email is in admin array in env file
    if (!process.env.ADMINS.includes(req.user.email))
      throw authError(403, "Go ask the cool admins boyyyy.");
    next();
  };
};

// password reset controller
//! http://<host>/auth/requestResetPassword
/*  req body from frontend:
{
"email": ""
}
 */
//*
//*
export const requestPasswordReset = async (req, res, next) => {

  try {
    // check if email exists
    const email = req.body.email;
    if (!email) {
      throw authError(400, "Enter your email address.");
    }
    // check if user with that email exists
    const user = await User.findOne({ email });
    if (!user) {
      throw authError(
        400,
        "There is no user associated with this email address."
      );
    }
    // check if user is verified
    if (!user.isVerified) {
      throw authError(
        401,
        "This email address has not been verified. Click 'Resend Verification Link' to verify your email."
      );
    }
    // find the jwt token associated with that user and delete it
    let jwtToken = await Token.findOne({ _userId: user._id });
    if (jwtToken) await jwtToken.deleteOne();

    // create a new token for password reset request, hash it and save it to database
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, 12);

    await new Token({
      _userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    // Read the HTML email template
    const templatePath = path.join(
      new URL("./email/templates/passwordTemplate.html", import.meta.url)
        .pathname
    );

    fs.readFile(templatePath, "utf8", async (err, data) => {
      if (err) {
        console.error(err);
        return handleEmailError(res, err);
      }

      // Replace placeholders in the email template with data
      const emailContent = data
        .replace("{{firstName}}", user.firstName)
        .replace("{{email}}", user.email)
        .replace(
          "{{verifyLink}}",
          `http://localhost:3000/auth/resetPassword/${resetToken}/${user._id}`
        );

      //create and send an email to the user email with a link for resetting the password
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAILUSER,
          pass: process.env.EMAILPASSWORD,
        },
      });
      // Configure email options
      const mailOptions = {
        from: "no-reply@lanola.com",
        to: user.email,
        subject: "Reset Password",
        html: emailContent,
      };

      // Send the email
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.error(err);
          handleEmailError(res, err);
        }

        return res
          .status(200)
          .send(`Password reset link sent to ${user.email}.`);
      });
    });
  } catch (error) {
    next(error);
  }
};


export const resetPassword = async (req, res, next) => {
  try {
    // check if passwords are valid and match
    const { userId, token, password, passwordConfirm } = req.body;
    if (!password) {
      throw authError(400, "Enter valid password");
    }
    if (password !== passwordConfirm) {
      throw authError(400, "Passwords dont match");
    }

    // use userid from url to find token in DB
    let passwordResetToken = await Token.findOne({ _userId: userId });
    if (!passwordResetToken) {
      throw authError(400, "Invalid or expired password reset token");
    }

    // compare token from link with token from DB
    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if (!isValid) {
      throw authError(400, "Invalid or expired password reset token");
    }
    // find the user with the userid, change password and save it to DB
    const user = await User.findOne({ _id: userId });
    user.password = password;
    await user.save();

    // delete resetToken
    await Token.deleteOne({ _userId: userId });

    successHandler(res, 200, "Updated password");
  } catch (error) {
    next(error);
  }
};
