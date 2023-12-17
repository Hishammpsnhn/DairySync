import Orders from "../models/OrdersModel.js";
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
                    {
                        $inc: {
                            [`${milkType}.quantity`]: quantity,
                        },
                    },
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
// @route   get /api/product/sellers
// @access  Private
export const ProductSellers = expressAsyncHandler(async (req, res) => {
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
        res.status(400).json({ message: error.message })
    }
});

// @desc   purchase the product
// @route   POST /api/product/purchase
// @access  Private
export const purchase = expressAsyncHandler(async (req, res) => {

    const { Type, quantity, paymentMethod, address, bookingDate, sellerId, category } = req.body.formData;
    const userId = req.user._id; // Adjust based on your authentication setup

    if( category === 'skimmed' || category === 'rich' || category ==='toned' || category ==='smart'){
        await Milk.updateOne(
            {},
            {
                $inc: {
                    [`${category}.quantity`]: -quantity,
                },
            },
            { upsert: true }
        );
    }

    const newOrder = new Orders({
        address,
        userId,
        sellerId,
        bookingDate:bookingDate,
        productType: Type ? Type : category,
        quantity,
        delivered: false,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });

});

export const myOrders = expressAsyncHandler(async (req, res) => {
    try {
        const user = req.user;
        if (user.role === 'user') {
            const myOrders = await Orders.find({ userId: user._id }).populate('sellerId');
            if (myOrders) {
                res.status(200).json(myOrders);
            }
        } else if (req.user.role === 'seller') {
            const myOrders = await Orders.find({ sellerId: user._id }).populate('userId');
            if (myOrders) {
                res.status(200).json(myOrders);
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        // Assuming you have a model called Order
        const updatedOrder = await Orders.updateOne(
            { _id: orderId }, // Assuming _id is the identifier for your order
            { $set: { delivered: true } }
        );
        if (updatedOrder) {
            res.status(200).json({ success: true, data: updatedOrder });
        }
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ success: false, error: 'Error updating order' });
    }
};

