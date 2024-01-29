import express from "express";
import {} from "../controllers/animalController.js";
import { admin, protect,seller } from "../middleware/authMiddleware.js";
import { addProduct,ProductSellers,purchase ,myOrders,updateOrder,getproduct,deleteSellerProduct,orderValidate} from "../controllers/productController.js";

const router = express.Router();

router.route('/purchase').post(protect, purchase);
router.route('/order/validate').post(protect, orderValidate);
router.route('/:userId/:productId').delete(protect, deleteSellerProduct);
router.route('/:id').post(protect, addProduct);
router.route('/myorders/:id').get(protect, updateOrder);
router.route('/myorders').get(protect, myOrders);
router.route('/sellers').get(ProductSellers);
router.route('/:id').get(protect, getproduct);

export default router