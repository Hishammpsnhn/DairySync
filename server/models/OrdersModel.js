
import mongoose from "mongoose";
// Define the milk schema
const milkSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming there's a User model to reference
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming there's a Seller model to reference
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  delivered: {
    type: Boolean,
    default: false, // Assuming initially the order is not delivered
  },
}, {
  timestamps: true,
});

// Create the Milk model
const Orders = mongoose.model('Orders', milkSchema);

export default Orders;


