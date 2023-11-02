import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    animalIdentification: {
        type: String,
        required: true,
    },
    animalType: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    cattleWeight: {
        type: Number,
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    breedingStatus: {
        type: String,
        required: true,
    },
    healthCondition: {
        type: Number,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    dateAdministered: Date,
    milkFrequency: Number,
    milkYeild: Number,
    vaccineName: String,
});

const Animal = mongoose.model('Animal', animalSchema);

export default Animal;
