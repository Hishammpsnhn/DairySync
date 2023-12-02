
import mongoose from "mongoose";
// Define the milk schema
const milkSchema = new mongoose.Schema({
    rich: {
        type: Number,
        default: 0,
    },
    toned: {
        type: Number,
        default: 0,
    },
    smart: {
        type: Number,
        default: 0,
    },
    skimmed: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
}
);

// Create the Milk model
const Milk = mongoose.model('Milk', milkSchema);

export default Milk;
