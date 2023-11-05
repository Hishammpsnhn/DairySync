import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    animalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: function () {
            return this.category === "Milk";
        }
    },
    type: {
        type: String,
        required: function () {
            // "type" is not required when "category" is "milk"
            return this.category !== "Milk";
        }
    },
    quantity: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
