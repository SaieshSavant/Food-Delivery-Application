// MyOrders.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);


  const fetchOrders = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      const json = await response.json();
      if (json.success) {
        setOrders(json.orders);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>My Orders</h1>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            Product: {order.productName} - Quantity: {order.quantity}
          </li>
        ))}
      </ul>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
