const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  orderItems: [{ 
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
