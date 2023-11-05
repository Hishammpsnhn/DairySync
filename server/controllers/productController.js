import Animal from "../models/animalModel.js";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";

// @desc    Add Product
// @route   POST /api/product/:id
// @access  Private/admin
export const addProduct = expressAsyncHandler(async (req, res) => {
    const sellerId = req.params.id;
    console.log(sellerId);
    console.log(req.body)
    try {
        const { category, type, quantity, animalId } = req.body.formData;
        console.log(category, type, quantity, animalId)

        //animal id is required
        if (animalId) {
            const animalnewId = await Animal.findOne({ animalIdentification: animalId })
            console.log(animalnewId);
            const product = await Product.create({
                sellerId,
                category,
                quantity,
                animalId: animalnewId
            })
            if (product)
                res.status(200).json(product)
        } else {
            const product = await Product.create({
                sellerId,
                category,
                type,
                quantity,
            })
            if (product)
                res.status(200).json(product)
        }

    } catch (error) {
        res.status(400)
        throw new Error("Something went wrong", error)
    }

})