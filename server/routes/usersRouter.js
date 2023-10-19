import express from "express";
import validateInput from "../middlewares/validateInput.js";
import sanitizeInput from "../middlewares/sanitizeInput.js";
import {
  signup,
  login,
  logout,
  getMe,
  protect,
  restrictTo,
  verifyCSRFToken,
} from "../controllers/authController.js";

import {
  getAllUsers,
  deleteAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  deleteAllTokens,
  placeOrder,
} from "../controllers/usersController.js";

const router = express.Router();

// unprotected routes for signup, login, logout
router.post("/signup", validateInput, sanitizeInput, signup);
router.post("/login", login);
router.post("/logout", logout);

// routes protected to be used by logged in users only
router.use(protect /* verifyCSRFToken */);

router.route("/me").get(getMe);
router
  .route("/me/:id")
  .patch(/* verifyCSRFToken, */ updateUserById)
  .delete(/* verifyCSRFToken, */ deleteUserById);

// protected routes for admin only using the csrf, protect and restrict middlewares
// router.use(restrictTo("admin"));

router.route("/").get(getAllUsers).delete(deleteAllUsers);
router.route("/placeOrder").post(placeOrder);
router.route("/:id").delete(deleteUserById);
router.route("/:id").get(getUserById);
router.route("/admin/tokens").delete(deleteAllTokens);

export default router;
