import express from "express";
import {} from "../controllers/animalController.js";
import { admin, protect,seller } from "../middleware/authMiddleware.js";
import { addProduct,ProductSellers,purchase ,myOrders,updateOrder,getproduct,deleteSellerProduct} from "../controllers/productController.js";

const router = express.Router();

router.route('/purchase').post(protect,purchase);
router.route('/:id').post(protect,addProduct);
router.route('/').get(protect,getproduct)
router.route('/:id').delete(protect,deleteSellerProduct);
router.route('/sellers').get(ProductSellers);
router.route('/myorders').get(protect,myOrders)
router.route('/myorders/:id').get(protect,updateOrder)

export default router