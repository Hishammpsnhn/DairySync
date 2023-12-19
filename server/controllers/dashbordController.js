import Orders from "../models/OrdersModel.js";
import Animal from "../models/animalModel.js";
import Milk from "../models/milkModal.js";
import Product from "../models/productModel.js";
import { Inventory, getTotalQuantity, getUsersCount } from "../utlils/dashboardUtils.js";

export const getDashboardAdminCredentials = async (req, res) => {
  try {
    const milkData = await Milk.find({});
    res.status(200).json(milkData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAdminBooking = async (req, res) => {
  try {
    const ordersWithBooking = await Orders.find({
      bookingDate: { $ne: null },
      delivered: false
    })
      .populate('userId')
      .exec();
    res.status(200).json(ordersWithBooking);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


export const getAdminLineGraph = async (req, res) => {
  try {
    const orders =await Orders.find({ bookingDate: { $exists: true, $ne: null } });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

//seller
export const getDashboardSellerCredentials = async (req, res) => {
  try {
    const userId = req.user._id;

    const [orderCount, productCount, animalCount] = await Promise.all([
      Orders.countDocuments({ sellerId: userId, delivered: false }),
      Product.countDocuments({ sellerId: userId }),
      Animal.countDocuments({ ownerId: userId }),
    ]);

    const result = [
      { orderCount: orderCount },
      { productCount: productCount },
      { animalCount: animalCount }
    ];
    res.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getSellerOrders = async (req, res) => {
  try {
    const ordersWithBooking = await Orders.find({
      sellerId: req.user.id,
      delivered: false
    })
      .populate('userId')
      .exec();
    console.log(ordersWithBooking);
    res.status(200).json(ordersWithBooking);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


export const getSellerBarGraph = async (req, res) => {
  try {
    const userId = '6536b4c3434059ee3ca0e912';
    const orders = await Orders.find({ sellerId: userId });

    const mockBarData = [];

    orders.forEach((order) => {
      const { productType, quantity, createdAt } = order;
      const month = monthToLabel(createdAt.getMonth());

      // Check if the month already exists in mockBarData
      const existingMonth = mockBarData.find((item) => item.country === month);

      if (existingMonth) {
        // Check if the productType already exists for that month
        const existingProduct = existingMonth[productType];

        if (existingProduct) {
          // Increment the quantity if productType exists
          existingMonth[productType] += quantity;
        } else {
          // Add new productType if it doesn't exist
          existingMonth[productType] = quantity;
          //existingMonth[`${productType}Color`] = getRandomColor(productType);
        }
      } else {
        // Create a new object for the month and add productType
        const newMonthObj = {
          country: month,
          [productType]: quantity,
        //  [`${productType}Color`]: getRandomColor(productType),
        };
        mockBarData.push(newMonthObj);
      }
    });
    mockBarData.sort((a, b) => {
      const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return monthOrder.indexOf(a.country) - monthOrder.indexOf(b.country);
    });
    res.status(200).json(mockBarData);
  } catch (error) {
    console.log("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

const monthToLabel = (index) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return monthNames[index];
};

