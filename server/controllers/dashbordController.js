import Product from "../models/productModel.js";
import { Inventory, getTotalQuantity, getUsersCount } from "../utlils/dashboardUtils.js";

export const getDashboardAdminCredentials = async (req, res) => {
  try {
    const totalQuantity = await getTotalQuantity();
    const inventory = await Inventory(totalQuantity)
    const totalClient =await getUsersCount();
  


    // Send the result to the client (you might want to send it in the response or render it on the page)
    res.status(200).json({ totalQuantity,inventory,totalClient });

  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getDashboardSellerCredentials = (req, res) => {
    console.log("seller", req.user)

}