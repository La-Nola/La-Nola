import express from "express";
import {
  addKidsclothes,
  deleteKidsclothesById,
  getAllKidsclothes,
  getKidsclothesById,
  deleteAllKidsclothes,
  updateKidsclothesById,
} from "../controllers/kidsclothesController.js";
import {
  restrictTo,
  protect,
  verifyCSRFToken,
} from "../controllers/authController.js";

const router = express.Router();

//routes for fetching the data from the DB
router.route("/").get(getAllKidsclothes);
router.route("/:id").get(getKidsclothesById);

// protected routes for admin only using the csrf, protect and restrict middlewares
// router.use(verifyCSRFToken, protect, restrictTo("admin"));

router.route("/").post(addKidsclothes).delete(deleteAllKidsclothes);
router.route("/:id").put(updateKidsclothesById).delete(deleteKidsclothesById);

export default router;
