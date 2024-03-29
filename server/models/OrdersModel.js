
import mongoose from "mongoose";
// Define the milk schema
const milkSchema = new mongoose.Schema({
  address: {
    type: String,

  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming there's a User model to reference
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming there's a Seller model to reference
  
  },
  productType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  bookingDate:{
    type:Date
  },
  price:{
    type: Number,
    required: true,
  },
  paymentMethod:{
    type:String,
  },
  payment:{
    type:Boolean,
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


