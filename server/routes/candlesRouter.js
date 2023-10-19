import express from "express";
import {
  getAllCandles,
  getCandleById,
  addCandle,
  deleteCandleById,
  deleteAllCandles,
  updateCandleById,
} from "../controllers/candlesController.js";
import {
  protect,
  restrictTo,
  verifyCSRFToken,
} from "../controllers/authController.js";

const router = express.Router();

//routes for fetching the data from the DB
router.route("/").get(getAllCandles);
router.route("/:id").get(getCandleById);

// protected routes for admin only using the csrf, protect and restrict middlewares
// router.use(verifyCSRFToken, protect, restrictTo("admin"));


router.route("/").post(addCandle).delete(deleteAllCandles);
router.route("/:id").put(updateCandleById).delete(deleteCandleById);

export default router;
