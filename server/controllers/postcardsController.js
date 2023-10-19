import Postcard from "../models/postcardModel.js";
import successHandler from "../middlewares/successHandler.js";
import { isValidId, isOldId } from "../middlewares/errorHandlers.js";



/* 
*     GET: http://localhost:8000/postcards
*/
export const getAllPostcards = async (req, res, next) => {
  try {
    const postcards = await Postcard.find();
    successHandler(res, 200, postcards, postcards.length);
  } catch (error) {
    next(error);
  }
};

/* 
*     GET: http://localhost:8000/postcards/:id
*/
export const getPostcardById = async (req, res, next) => {
  try {
    isValidId(req);
    const postcard = await Postcard.findById(req.params.id);
    isOldId(postcard);
    successHandler(res, 200, postcard);
  } catch (error) {
    next(error);
  }
};

//!ADMIN ONLY
/* 
*     POST: http://localhost:8000/postcards
^     {
            "images": {
                "cloudinary": "https://res.cloudinary.com/dyovta0wy/image/upload/v1693428596/La%20Nola/Postkarten/Gru%C3%9Fkarten/herzen_rot_pmtnuj.jpg",
                "smallSize": "t_25width/",
                "thumbnail": "t_media_lib_thumb/"
            },
            "productName": "Herzen",
            "price": "2",
            "stock": 10,
            "newProduct": false,
            "isSale": 0,
            "category": "postcard",
            "colors": [
                "red"
            ],
            "subcategory": "grusskarten",
        }
*/
export const addPostcard = async (req, res, next) => {
  try {
    const cloth = new Postcard(req.body);
    await cloth.save();
    successHandler(res, 200, cloth);
  } catch (error) {
    next(error);
  }
};

//!ADMIN ONLY
/* 
*     DELETE: http://localhost:8000/postcards/:id
*/
export const deletePostcardById = async (req, res, next) => {
  try {
    isValidId(req);
    const postcard = await Postcard.findByIdAndDelete(req.params.id);
    successHandler(res, 200, postcard);
  } catch (error) {
    next(error);
  }
};

//!ADMIN ONLY
/* 
*     DELETE: http://localhost:8000/postcards
*/
export const deleteAllPostcards = async (req, res, next) => {
  try {
    const deleteConfirm = await Postcard.deleteMany();
    successHandler(res, 200, deleteConfirm);
  } catch (error) {
    next(error);
  }
};

//!ADMIN ONLY
/* 
*     GET: http://localhost:8000/postcards
^     {
    "product": "64f9d1b24fb8c2fa52858164",
    "quantity": 5
      }
*/
export const updatePostcardById = async (req, res, next) => {
  try {
    isValidId(req);
    const postcard = await Postcard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successHandler(res, 200, postcard);
  } catch (error) {
    next(error);
  }
};
