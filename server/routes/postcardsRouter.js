import express from "express";
import {
  getAllPostcards,
  getPostcardById,
  addPostcard,
  deleteAllPostcards,
  updatePostcardById,
  deletePostcardById,
} from "../controllers/postcardsController.js";
import {
  protect,
  restrictTo,
  verifyCSRFToken,
} from "../controllers/authController.js";

const router = express.Router();

//routes for fetching the data from the DB
router.route("/").get(getAllPostcards);
router.route("/:id").get(getPostcardById);

// protected routes for admin only using the csrf, protect and restrict middlewares
// router.use(verifyCSRFToken, protect, restrictTo("admin"));

router.route("/").post(addPostcard).delete(deleteAllPostcards);
router.route("/:id").put(updatePostcardById).delete(deletePostcardById);

export default router;
