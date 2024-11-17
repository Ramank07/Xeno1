const mongoose = require("mongoose");

// Order Schema
const orderSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

// Customer Schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,  },
  phone: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [orderSchema], // Embedding orders as an array
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);
