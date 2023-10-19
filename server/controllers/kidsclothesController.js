import Kidsclothes from "../models/kidsclothesModel.js";
import successHandler from "../middlewares/successHandler.js";
import { isValidId, isOldId } from "../middlewares/errorHandlers.js";



/* 
*     GET: http://localhost:8000/kidsclothes/
*/
export const getAllKidsclothes = async (req, res, next) => {
  try {
    const kidsclothes = await Kidsclothes.find();
    successHandler(res, 200, kidsclothes, kidsclothes.length);
  } catch (error) {
    next(error);
  }
};


/* 
*     GET: http://localhost:8000/kidsclothes/:id
*/
export const getKidsclothesById = async (req, res, next) => {
  try {
    isValidId(req);
    const cloth = await Kidsclothes.findById(req.params.id);
    isOldId(cloth);
    successHandler(res, 200, cloth);
  } catch (error) {
    next(error);
  }
};

/* 
*     POST: http://localhost:8000/kidsclothes/
^     {
            "images": {
                "cloudinary": "https://res.cloudinary.com/dtrhoryp3/image/upload/v1694444563/La%20Nola/Kinderkleidung/Jacken/DSC05670_hxdz3z_widc1j.jpg"
            },
            "productName": "Jacke",
            "price": "45-85",
            "stock": 10,
            "newProduct": false,
            "isSale": 0,
            "category": "kidsclothes",
            "colors": [
                "multi"
            ],
            "subcategory": "jacken",
            "sizes": [
                "0-3 M (56/62)",
                "3-6 M (62/68)",
                "6-9 M (68/74)",
                "9-12 M (74/80)",
                "12-18 M (80/86)"
            ]
        }
*/
export const addKidsclothes = async (req, res, next) => {
  try {
    const cloth = new Kidsclothes(req.body);
    await cloth.save();
    successHandler(res, 200, cloth);
  } catch (error) {
    next(error);
  }
};

/* 
*     DELETE: http://localhost:8000/kidsclothes/:id
*/
export const deleteKidsclothesById = async (req, res, next) => {
  try {
    isValidId(req);
    const cloth = await Kidsclothes.findByIdAndDelete(req.params.id);
    successHandler(res, 200, cloth);
  } catch (error) {
    next(error);
  }
};

/* 
*     DELETE: http://localhost:8000/kidsclothes
*/
export const deleteAllKidsclothes = async (req, res, next) => {
  try {
    const deleteConfirm = await Kidsclothes.deleteMany();
    successHandler(res, 200, deleteConfirm);
  } catch (error) {
    next(error);
  }
};

/* 
*     PUT: http://localhost:8000/kidsclothes/:id
^     {
    "field1: "new value1",
    "field2": "new value2"
      }
*/
export const updateKidsclothesById = async (req, res, next) => {
  try {
    isValidId(req);
    const cloth = await Kidsclothes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successHandler(res, 200, cloth);
  } catch (error) {
    next(error);
  }
};
