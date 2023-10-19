import Candle from "../models/candleModel.js";
import successHandler from "../middlewares/successHandler.js";
import { isValidId, isOldId } from "../middlewares/errorHandlers.js";

/* 
*     GET: http://localhost:8000/candles
*/
export const getAllCandles = async (req, res, next) => {
  try {
    const candles = await Candle.find();
    successHandler(res, 200, candles, candles.length);
  } catch (error) {
    next(error);
  }
};

/* 
*     GET: http://localhost:8000/candles/:id
*/
export const getCandleById = async (req, res, next) => {
  try {
    isValidId(req);
    const candle = await Candle.findById(req.params.id);
    isOldId(candle);
    successHandler(res, 200, candle);
  } catch (error) {
    next(error);
  }
};


//!Restricted ( for admin only)
/* 
*     POST: http://localhost:8000/candles/
^     {
    "images": {
        "cloudinary": "https://res.cloudinary.com/dtrhoryp3/image/upload/v1694444092/La%20Nola/Kerzen/Gedenkkerzen/DSC09274_hkrsvd_rpaezq.jpg"
    },
    "productName": "Gedenkkerzen",
    "price": "15-20",
    "stock": 10,
    "newProduct": false,
    "isSale": 0,
    "category": "candle",
    "colors": [
        "white"
    ],
    "subcategory": "gedenkkerzen"
}
*/
export const addCandle = async (req, res, next) => {
  try {
    const candle = new Candle(req.body);
    await candle.save();
    successHandler(res, 200, candle);
  } catch (error) {
    next(error);
  }
};




//!Restricted ( for admin only)
/* 
*     DELETE: http://localhost:8000/candles/:id
*/
export const deleteCandleById = async (req, res, next) => {
  try {
    isValidId(req);
    const candle = await Candle.findByIdAndDelete(req.params.id);
    successHandler(res, 200, candle);
  } catch (error) {
    next(error);
  }
};


//!Restricted ( for admin only)
/* 
*     DELETE: http://localhost:8000/candles/
*/
export const deleteAllCandles = async (req, res, next) => {
  try {
    const deleteConfirm = await Candle.deleteMany();
    successHandler(res, 200, deleteConfirm);
  } catch (error) {
    next(error);
  }
};

//!Restricted ( for admin only)
/* 
*     PUT: http://localhost:8000/candles/:id
^     {
    "field": "new value"
}
*/
export const updateCandleById = async (req, res, next) => {
  try {
    isValidId(req);
    // The `req.params.id` specifies the ID of the candle to update, and `req.body` contains the updated data
    const candle = await Candle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successHandler(res, 200, candle);
  } catch (error) {
    next(error);
  }
};
