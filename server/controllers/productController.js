import Animal from "../models/animalModel.js";
import Milk from "../models/milkModal.js";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";

// @desc    Add Product
// @route   POST /api/product/:id
// @access  Private/admin
export const addProduct = expressAsyncHandler(async (req, res) => {
    const sellerId = req.params.id;
    try {
        const { category, type, quantity, animalId, quality } = req.body.formData;
        console.log(category, type, quantity, animalId)

        //animal id is required
        if (animalId) {
            const animalnewId = await Animal.findOne({ animalIdentification: animalId })
            if (!animalnewId) return res.status(400).json({ message: 'animal with this id not exists' });
            const product = await Product.create({
                sellerId,
                category,
                quantity,
                quality,
                animalId: animalnewId
            })
            if (category === 'Milk') {
                let milkType = '';

                if (quality <= 1) {
                    milkType = 'skimmed';
                } else if (quality <= 2) {
                    milkType = 'smart';
                } else if (quality <= 3.5) {
                    milkType = 'toned';
                } else {
                    milkType = 'rich';
                }
                const ret = await Milk.updateOne(
                    {},
                    { $inc: { [milkType]: quantity } },
                    { upsert: true }
                );
                console.log(ret);
                if (product)
                    res.status(200).json(product)
            }
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

// @desc   find product sellers
// @route   POST /api/product/sellers
// @access  Private
export const ProductSellers = expressAsyncHandler(async (req, res) => {
    console.log("Product sellers called")
    const type = req.query.type;
    try {
        const productsWithSameType = await Product.find({ type }).populate('sellerId');

        // Use a Set to keep track of unique sellers
        const uniqueSellers = new Set();

        // Extract and format relevant information
        const formattedData = productsWithSameType.reduce((acc, product) => {
            const sellerName = product.sellerId.userName;
            const sellerId = product.sellerId._id;

            // Check if the sellerName is not already in the set
            if (!uniqueSellers.has(sellerId)) {
                uniqueSellers.add(sellerId);

                // Add the formatted data to the accumulator
                acc.push({
                    id: sellerId,
                    type: product.type,
                    seller: sellerName,
                });
            }

            return acc;
        }, []);
        res.json(formattedData);
    } catch (error) {
        res.json({ message: error.message })
    }



});