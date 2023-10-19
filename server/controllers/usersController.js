import User from "../models/userModel.js";
import successHandler from "../middlewares/successHandler.js";
import { isValidId } from "../middlewares/errorHandlers.js";
import ApiQueryHandler from "../utilities/apiQueryHandler.js";

/*
 *     GET: http://localhost:8000/users
 */
export const getAllUsers = async (req, res, next) => {
  try {
    let apiQuery = new ApiQueryHandler(User, req.query)
      //Filter the documents based on query parameters.
      .filterDocs()
      //Sort the filtered documents if sorting criteria are provided.
      .sortDocs()
      //Limit the fields returned in the documents if specified.
      .limitFields()
      //Paginate the filtered and sorted documents based on pagination parameters.
      .paginateDocs();

    const users = await apiQuery.model;
    successHandler(res, 200, users, users.length);
  } catch (error) {
    next(error);
  }
};

export const placeOrder = async (req, res, next) => {
  try {
    const { order, userId, items } = req.body;
    const updatedUser = await User.findById(userId);

    updatedUser.orders.push({
      order: order,
      items: items,
    });

    await updatedUser.save();
    successHandler(res, 200, updatedUser);
  } catch (error) {
    next(error);
  }
};

/*
 *     DELETE: http://localhost:8000/users
 */
export const deleteAllUsers = async (req, res, next) => {
  try {
    //Use`deleteMany` method to delete all users with the role "user".
    const deleteConfirm = await User.deleteMany({ role: "user" });
    successHandler(res, 200, deleteConfirm);
  } catch (error) {
    next(error);
  }
};

/*
 *     PATCH: http://localhost:8000/users/me/:id
         req.body : {
  ^             "field":"new value"
  ^             }
 */
export const updateUserById = async (req, res, next) => {
  try {
    //Validate if the request parameter is a valid identifier.
    isValidId(req);
    const user = await User.findById(req.params.id);

    if (user) {
      //Update the user's properties based on the request body
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.billingAddress = req.body.billingAddress || user.billingAddress;
      user.shippingAddress = req.body.shippingAddress || user.shippingAddress;

      const updatedUser = await user.save();
      successHandler(res, 200, updatedUser);
    } else {
      // If the user with the ID is not found, throw an error.
      throw authError(404, "User not found!");
    }
  } catch (error) {
    next(error);
  }
};

/*
 *     DELETE: http://localhost:8000/users/me/:id
 */
export const deleteUserById = async (req, res, next) => {
  try {
    isValidId(req);
    const user = await User.findByIdAndDelete(req.params.id);
    successHandler(res, 200, user);
  } catch (error) {
    next(error);
  }
};

/*
 *     GET: http://localhost:8000/users/:id
 */
export const getUserById = async (req, res, next) => {
  try {
    isValidId(req);
    const user = await User.findById(req.params.id);
    successHandler(res, 200, user);
  } catch (error) {
    next(error);
  }
};

/*
 *     DELETE: http://localhost:8000/users/admin/tokens
 */
export const deleteAllTokens = async (req, res, next) => {
  try {
    const deleteConfirm = await Token.deleteMany();
    successHandler(res, 200, deleteConfirm);
  } catch (error) {
    next(error);
  }
};
