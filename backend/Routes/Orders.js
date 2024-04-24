const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/placeorder', async (req, res) => {
  try {
    const { userName, orderItems, totalPrice } = req.body;
    const newOrder = new Order({ userName, orderItems, totalPrice });
    await newOrder.save();
    res.status(201).json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
});





router.get('/myorders', async (req, res) => {
  try {
    const lastOrder = await Order.findOne().sort({ orderDate: -1 });
    if (!lastOrder) {
      return res.status(404).json({ success: false, message: 'No orders found' });
    }
    console.log(lastOrder)
    res.json({ success: true, lastOrder });
  } catch (error) {
    console.error('Error fetching last order:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});






module.exports = router;
