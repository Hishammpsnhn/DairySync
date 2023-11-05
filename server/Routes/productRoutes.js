import express from "express";
import {} from "../controllers/animalController.js";
import { protect } from "../middleware/authMiddleware.js";
import { addProduct } from "../controllers/productController.js";

const router = express.Router();

router.route('/:id').post(protect,addProduct);


export default router