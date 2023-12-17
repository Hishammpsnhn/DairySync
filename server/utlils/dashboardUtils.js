import Product from "../models/productModel.js";
import User from "../models/userModel.js";

export const getTotalQuantity = async () => {
    // Set today's date to the beginning of the day
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Run the aggregation pipeline
    const result = await Product.aggregate([
        {
            $match: {
                category: 'Milk',
                $expr: {
                    $gte: [
                        { $toDate: '$createdAt' }, // Convert String to Date
                        today,
                    ],
                },
            },
        },
        {
            $group: {
                _id: null,
                totalQuantity: { $sum: '$quantity' },
            },
        },
    ]);
    // Output the result
    const totalQuantity = result[0]?.totalQuantity || 0;
    // const inventory = await Inventory(totalQuantity)
    // console.log(totalQuantity,inventory)
    return totalQuantity;
}

export const Inventory = async (todayMilkCollection, maxCapacity = 1000) => {
    const per =  (todayMilkCollection / maxCapacity) * 100;
    return per;
}
export const getUsersCount = async () => {
    try {
        const userCount = await User.countDocuments();
        return userCount - 1
    } catch (error) {
        console.error('Error:', error);
    }
};
