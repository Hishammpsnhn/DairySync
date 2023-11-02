import express from "express";
import { getAnimals,registerAnimal} from "../controllers/animalController.js";

const router = express.Router();

router.route('/:id').post(registerAnimal).get(getAnimals)


export default router