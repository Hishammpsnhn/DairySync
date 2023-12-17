import express from "express";
import { getDashboardSellerCredentials, getDashboardAdminCredentials,getAdminBooking,getSellerBarGraph, getAdminLineGraph,getSellerOrders } from "../controllers/dashbordController.js";
import { admin, protect, seller } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route('/admin').get(getDashboardAdminCredentials);
router.route('/admin/booking').get(getAdminBooking);
router.route('/admin/linegraph').get(getAdminLineGraph);
router.route('/seller').get(protect,seller,getDashboardSellerCredentials);
router.route('/seller/orders').get(protect,seller,getSellerOrders);
router.route('/seller/bargraph').get(protect,seller,getSellerBarGraph);
export default router