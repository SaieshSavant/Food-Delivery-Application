import React, { useEffect, useState } from 'react';

const MyOrders = () => {
  const [lastOrder, setLastOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastOrder = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/myorders');
        const data = await response.json();
        if (data.success) {
          setLastOrder(data.lastOrder);
        } else {
          // Handle error fetching last order
          console.error('Error fetching last order:', data.message);
        }
      } catch (error) {
        console.error('Error fetching last order:', error);
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchLastOrder();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#331800' }}>My Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : lastOrder ? (
        <div style={{ backgroundColor: '#F6E8B1', padding: '20px', borderRadius: '10px' }}>
          <h3 style={{ color: '#331800' }}>Order Details</h3>
          <p style={{ color: '#331800' }}>Order ID: {lastOrder._id}</p>
          <p style={{ color: '#331800' }}>Order Date: {new Date(lastOrder.orderDate).toLocaleString()}</p>
          <h4 style={{ color: '#331800' }}>Order Items:</h4>
          <ul>
            {lastOrder.orderItems.map((item, index) => (
              <li key={index} style={{ color: '#331800' }}>
                Name: {item.name}, Quantity: {item.quantity}, Price: {item.price}
              </li>
            ))}
          </ul>
          <p style={{ color: '#331800' }}>Total Price: Rs. {lastOrder.totalPrice}/-</p>
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#331800', fontSize: '20px' }}>No orders found</p>
      )}
    </div>
  );
};

export default MyOrders;
