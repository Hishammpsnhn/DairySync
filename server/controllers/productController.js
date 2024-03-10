import Orders from "../models/OrdersModel.js";
import Animal from "../models/animalModel.js";
import Milk from "../models/milkModal.js";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import Razorpay from 'razorpay'

// @desc    Add Product
// @route   POST /api/product/:id
// @access  Private/admin
export const addProduct = expressAsyncHandler(async (req, res) => {

    const sellerId = req.params.id;
    console.log("add product", sellerId)
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

    const { Type, quantity, paymentMethod, address, bookingDate, sellerId, category, price } = req.body.formData;
    const userId = req.user._id; // Adjust based on your authentication setup
    console.log(req.body)
    if (paymentMethod && paymentMethod === 'Online Payment') {
        try {
            const razorpay = new Razorpay({
                key_id: "rzp_test_M05VBThvR3P0DV",
                key_secret: "URrFVJ3ouN4XBqBhGfT6KEm9",
            });

            const options = {
                amount: 1000,
                currency: "INR",
                receipt: "receipt#1",
            };
            const order = await razorpay.orders.create(options);

            if (!order) {
                return res.status(500).send("Error");
            }

            res.json(order);
        } catch (err) {
            console.log(err);
            res.status(500).send("Error");
        }

    } else {

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
            payment: false,
            paymentMethod,
            price: price ? price : 0
        });

        await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    }
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
        const qty = updatedOrder.quantity;
        console.log("updated",updatedOrder)
        const data = await Milk.updateOne(
            {},
            {
                $inc: {
                    [`${updatedOrder.productType.toLowerCase()}.quantity`]: -qty,
                },
            },
            { upsert: true }
        );
            console.log("data is ",data)
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

export const orderValidate = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
        return res.status(400).json({ msg: "Transaction is not legit!" });
    }

    res.json({
        msg: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
    });


};
