import mongoose from "mongoose";

const milkProductionSchema = new mongoose.Schema({
    animalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    milkYeild: {
        type: Number,
        required: true,
    },
});

const MilkProduction = mongoose.model('MilkProduction', milkProductionSchema);

export default MilkProduction;
