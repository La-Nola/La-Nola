import express from "express";
import {
  protect,
  restrictTo,
  verifyCSRFToken,
} from "../controllers/authController.js";
import {
  getCart,
  addCartItem,
  deleteCartItemById,
  updateCartItemFieldById,
  deleteAllCartItems,
  deleteCarts,
} from "../controllers/cartController.js";

const router = express.Router();

// routes protected to be used by logged in users only
// router.use(protect, verifyCSRFToken);

router
  .route("/:id")
  .get(getCart)
  .post(addCartItem)
  .put(deleteCartItemById)
  .patch(updateCartItemFieldById)
  .delete(deleteAllCartItems);

// protected routes for admin only using the csrf, protect and restrict middlewares
router.route("/").delete(/* restrictTo("admin"),  */ deleteCarts);

export default router;
