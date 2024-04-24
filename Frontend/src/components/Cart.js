import React, { useState, useContext } from 'react';
import { CartContext } from '../components/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies library

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOrderSubmit = async () => {
    try {
      setLoading(true);
      

      const orderData = {
        userName: Cookies.get('userName'), // Retrieve username from cookies
        orderItems: cartItems.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
        totalPrice: calculateTotalPrice()
      };

      const response = await fetch('http://localhost:4000/api/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('authToken')}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();
      if (data.success) {
        navigate('/MyOrders');
      } else {
        console.error('Failed to place order:', data.message);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateItemTotal = (item) => {
    return item.price;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += calculateItemTotal(item);
    });
    return totalPrice;
  };

  return (
    <div style={{ color: '#331800', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>My Cart</h1>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '40px' }}>Your cart is empty!</p>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ fontSize: '20px' }}>
              <tr>
                <th style={{ borderBottom: '1px solid white', padding: '10px' }}>#</th>
                <th style={{ borderBottom: '1px solid white', padding: '10px' }}>Name</th>
                <th style={{ borderBottom: '1px solid white', padding: '10px' }}>Quantity</th>
                <th style={{ borderBottom: '1px solid white', padding: '10px' }}>Option</th>
                <th style={{ borderBottom: '1px solid white', padding: '10px' }}>Amount</th>
                <th style={{ borderBottom: '1px solid white', padding: '10px' }}></th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '20px' }}>
              {cartItems.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ borderBottom: '1px solid white', padding: '10px' }}>{index + 1}</td>
                  <td style={{ borderBottom: '1px solid white', padding: '10px' }}>{item.name}</td>
                  <td style={{ borderBottom: '1px solid white', padding: '10px' }}>{item.quantity}</td>
                  <td style={{ borderBottom: '1px solid white', padding: '10px' }}>{item.option}</td>
                  <td style={{ borderBottom: '1px solid white', padding: '10px' }}>Rs. {calculateItemTotal(item)}</td>
                  <td style={{ borderBottom: '1px solid white', padding: '10px' }}>
                    <p onClick={() => removeFromCart(item.id)} style={{ cursor: 'pointer' }}>
                      <DeleteIcon />
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 style={{ textAlign: 'left', marginTop: '20px' }}>Total Price: Rs. {calculateTotalPrice()}</h4>
          <button
            onClick={handleOrderSubmit}
            style={{
              display: 'block',
              margin: '20px auto',
              padding: '10px 20px',
              backgroundColor: '#331800',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </>
      )}
    </div>
  );
}
