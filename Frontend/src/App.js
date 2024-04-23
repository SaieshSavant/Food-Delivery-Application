// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext'; 
import Login from './components/Login';
import Signup from './components/Signup';
import MyOrders from './components/MyOrders';

function App() {
  return (
    <Router>
      <CartProvider> 
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Cart" element={<Cart />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Signup" element={<Signup />} />
            <Route exact path="/MyOrders" element={<MyOrders />} />


          </Routes>
         
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
