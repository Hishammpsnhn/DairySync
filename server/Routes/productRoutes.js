import express from "express";
import {} from "../controllers/animalController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import { addProduct,ProductSellers } from "../controllers/productController.js";

const router = express.Router();

router.route('/:id').post(protect,admin,addProduct);
router.route('/sellers').get(ProductSellers);


export default router