import asyncHandler from "express-async-handler";
import Animal from "../models/animalModel.js";

// @desc    Get all animals
// @route   GET /api/animal
// @access  Private/seller
export const getAnimals = asyncHandler(async (req, res) => {
    const ownerId = req.params.id;
    try {
        const animals = await Animal.find({ ownerId })
        res.status(200).json(animals)
    } catch (error) {
        res.status(400)
        throw new Error("Something went wrong")
    }

})

// @desc    Register a new animal
// @route   POST /api/animal
// @access  Private/seller
export const registerAnimal = asyncHandler(async (req, res) => {
    const ownerId = req.params.id;
    const {
        animalType,
        animalIdentification,
        dateOfBirth,
        purchasePrice,
        breed,
        breedingStatus,
        cattleWeight,
        milkYeild,
        milkFrequency,
        vaccineName,
        dateAdministered,
        healthCondition
    } = req.body.formData;

    const animalExist = await Animal.findOne({ animalIdentification })

    if (animalExist) return res.status(400).json({ message: 'animal with this id already exists' });



    const animal = await Animal.create({
        animalType,
        animalIdentification,
        dateOfBirth,
        purchasePrice,
        breed,
        breedingStatus,
        cattleWeight,
        milkYeild,
        milkFrequency,
        vaccineName,
        dateAdministered,
        healthCondition,
        ownerId
    })

    if (animal) {
        res.status(200).json({
            _id: animal._id,
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})