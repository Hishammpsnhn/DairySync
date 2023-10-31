import express from "express";
import { getUsers, authUser,registerUser,} from "../controllers/userController.js";

const router = express.Router();

router.route('/').post(registerUser).get(getUsers)
router.route('/login').post(authUser)


export default router