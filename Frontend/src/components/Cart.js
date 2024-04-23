import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

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
            onClick={() => console.log('Order Placed')}
            style={{
              display: 'block',
              margin: '20px auto',
              padding: '10px 20px',
              backgroundColor: '#331800',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
