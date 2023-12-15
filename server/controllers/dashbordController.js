import Orders from "../models/OrdersModel.js";
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


export const getDashboardSellerCredentials = (req, res) => {
  try {

  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

}

export const getAdminBooking = async (req, res) => {
  console.log("getAdminBookingssss")
  try {
    const ordersWithBooking = await Orders.find({
      bookingDate: { $exists: true },
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


export const getAdminLineGraph = async (req,res) => {
  console.log("hello")
  try {
    const orders = await Orders.find({ bookingDate: { $exists: true } }); // Adjust the query as needed

    // const monthlyData = {};

    // orders.forEach((order) => {
    //   const month = order.bookingDate.getMonth(); // Extracting month (0-indexed)
    //   const productType = order.productType;

    //   if (!monthlyData[productType]) {
    //     monthlyData[productType] = {
    //       id: productType,
    //       color: getColorForProductType(productType),
    //       data: [],
    //     };
    //   }

    //   monthlyData[productType].data.push({
    //     x: monthToLabel(month),
    //     y: order.quantity,
    //   });
    // });

    // const result = Object.values(monthlyData);

    console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Helper function to convert month index to label
// const monthToLabel = (index) => {
//   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   return monthNames[index];
// };

// const getColorForProductType = (productType) => {
//   switch (productType) {
//     case 'Rich':
//       return tokens("dark").greenAccent[500];
//     case 'Skimmed':
//       return tokens("dark").blueAccent[300];
//     case 'Smart':
//       return tokens("dark").redAccent[200];
//     case 'Toned':
//       return tokens("dark").redAccent[500];
//     default:
//       return 'defaultColor'; // Provide a default color or handle accordingly
//   }
// };
