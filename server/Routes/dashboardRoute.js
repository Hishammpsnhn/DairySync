import express from "express";
import { getDashboardSellerCredentials, getDashboardAdminCredentials } from "../controllers/dashbordController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route('/').get(protect, (req, res, next) => {
    // Check the user role and call the appropriate controller function
    if (req.user.role === 'admin') {
        admin(req, res, next);
        getDashboardAdminCredentials(req, res);
    } else if (req.user.role === 'seller') {
        seller(req, res, next);
        getDashboardSellerCredentials(req, res);
    } else {
        // Handle other cases or send an error response
        res.status(403).json({ message: 'Unauthorized' });
    }
});


export default router