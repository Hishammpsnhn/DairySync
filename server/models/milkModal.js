import mongoose from "mongoose";

// Define the milk schema
const milkSchema = new mongoose.Schema({
    rich: {
        quantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            default: 0,
        },
    },
    toned: {
        quantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            default: 0,
        },
    },
    smart: {
        quantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            default: 0,
        },
    },
    skimmed: {
        quantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            default: 0,
        },
    },
}, {
    timestamps: true,
});

// Create the Milk model
const Milk = mongoose.model('Milk', milkSchema);

export default Milk;
