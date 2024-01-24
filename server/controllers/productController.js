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
    console.log("add product",sellerId)
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
                const Milkdata = await Milk.findOne({});
                if (Milkdata && product)
                    res.status(200).json(Milkdata)
            }
        } else {
            const existingProduct = await Product.findOne({
                sellerId,
                type,
            });

            if (existingProduct) {
                return res.status(400).json({ success: false, error: 'Product already exists for this seller and type' });
            }
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

    if (category === 'skimmed' || category === 'rich' || category === 'toned' || category === 'smart') {
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
        bookingDate: bookingDate,
        productType: Type ? Type : category,
        quantity,
        delivered: false,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });

});

export const myOrders = expressAsyncHandler(async (req, res) => {
    console.log("this is my orders")
    try {
        const user = req.user;
        console.log(user)
        if (user.role === 'user') {
            const myOrders = await Orders.find({ userId: user._id }).populate('sellerId').sort({ delivered: 1 });
            if (myOrders) {
                res.status(200).json(myOrders);
            }
        } else if (req.user.role === 'seller') {
            const myOrders = await Orders.find({ sellerId: user._id }).populate('userId').sort({ delivered: 1 });
            if (myOrders) {
                res.status(200).json(myOrders);
            }
        } else if (req.user.role === 'admin') {
            const ordersWithBooking = await Orders.find({
                bookingDate: { $ne: null },
            }).populate('userId')
                .sort({ delivered: 1 })
                .exec();
            res.status(200).json(ordersWithBooking);
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export const updateOrder = async (req, res) => {
    const orderId = req.params.id;

    try {
        // Assuming you have a model called Order
        const updatedOrder = await Orders.findOneAndUpdate(
            { _id: orderId }, // Assuming _id is the identifier for your order
            { $set: { delivered: true } },
            { new: true } // Return the modified document rather than the original
        );

        if (updatedOrder) {
            res.status(200).json({ success: true, data: updatedOrder });
        }
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ success: false, error: 'Error updating order' });
    }
};
export const getproduct = async (req, res) => {
    const userId = req.params.id;
    console.log(userId)

    try {
        const result = await Product.find({
            sellerId: userId,
            type: { $exists: true }
        });
        console.log(result)
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ success: false, error: 'Error updating order' });
    }
};
export const deleteSellerProduct = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    console.log(userId, productId);

    try {
        const deletedProduct = await Product.findOneAndDelete({
            sellerId: userId,
            _id: productId,
        });

        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.status(200).json(deletedProduct);

    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ success: false, error: 'Error updating order' });
    }
};

