import express from "express";
import { getUsers, authUser,registerUser,addSeller} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').post(registerUser).get(protect,admin,getUsers)
router.route('/addseller').post(protect,admin,addSeller)
router.route('/login').post(authUser)


export default router