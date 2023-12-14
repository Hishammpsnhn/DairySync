import Milk from "../models/milkModal.js";
import Product from "../models/productModel.js";
import { Inventory, getTotalQuantity, getUsersCount } from "../utlils/dashboardUtils.js";

export const getDashboardAdminCredentials = async (req, res) => {
  try {
    const milkData = await Milk.find({});
    console.log(milkData)
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