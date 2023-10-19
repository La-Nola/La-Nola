import successHandler from "../middlewares/successHandler.js";
import Cart from "../models/cartModel.js";

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id).populate("items.product");
    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};

/* 
*     POST: http://localhost:8000/carts/64f74fab0aff95299ff61755
^     {
    "product": "64f9d1b24fb8c2fa52858164",
    "quantity": 5
      }
*/

export const addCartItem = async (req, res, next) => {
  try {
    const { product, size, quantity, productType } = req.body;
    let cart = await Cart.findById(req.params.id);

    // If the cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ _id: req.params.id, items: [] });
    }

    // Check if the product already exists in the cart
    const existingItemIndex = cart.items.findIndex((item) =>
      item.product.equals(product)
    );

    if (productType !== "Kidsclothes") {
      if (existingItemIndex !== -1) {
        // If the product already exists, increase the quantity

        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // If the product doesn't exist, add a new item
        cart.items.push({ product, quantity, productType });
      }
    } else if (productType === "Kidsclothes") {
      if (existingItemIndex !== -1) {
        console.log("SIZE", size);
        if (
          cart.items[existingItemIndex].size.find((ele) => ele.size === size)
        ) {
          cart.items[existingItemIndex].size.find(
            (ele) => ele.size === size
          ).quantity += quantity;
        } else {
          cart.items[existingItemIndex].size.push({ size, quantity });
        }
      } else {
        // If the product doesn't exist, add a new item
        cart.items.push({ product, size: [{ size, quantity }], productType });
      }
    }

    await cart.populate("items.product");
    await cart.save();

    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};

/* 
  * PUT: http://localhost:8000/carts/64f74fab0aff95299ff61755
  ^ req.body : {record:"64f9d1b24fb8c2fa52858164"}
  */

export const deleteCartItemById = async (req, res, next) => {
  try {
    const { product } = req.body;
    //we use the `$pull` to remove an item with the specified 'product'.
    // The { new: true } ensures that the updated cart is returned.
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $pull: { items: { product } } },
      { new: true }
    )
      // Populate the 'items.product' field in the updated cart with product details.
      .populate("items.product");
    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};

/* 
  ! Update one field (quantity) in the items array in the cart document
  * PATCH: http://localhost:8000/carts/64f74fab0aff95299ff61769
  ^ req.body : {
  ^             record:"64f9bdbc52d7c7db272b3cd6",
  ^             "quantity": 5
  ^             }
  */

export const updateCartItemFieldById = async (req, res, next) => {
  try {
    const { quantity, product } = req.body;
    //`$set` to update the 'quantity' field of a specific item
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: { "items.$[item].quantity": quantity } },
      {
        //to specify which array elements to update.
        arrayFilters: [{ "item.product": product }],
        // Ensure that the updated cart is returned.
        new: true,
      }
    );
    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};

//! Delete the entire cart document
// * DELETE: http://localhost:8000/carts/
export const deleteCarts = async (req, res, next) => {
  try {
    const cart = await Cart.deleteMany();
    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};

//! Delete all the items inside the array in the cart document
// * DELETE: http://localhost:8000/carts/63eb90ca444724041af1803f
export const deleteAllCartItems = async (req, res, next) => {
  try {
    //`$set` to set the 'items' array to an empty array,
    // deleting all items from the cart.
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: { items: [] } },
      { new: true }
    );
    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};
