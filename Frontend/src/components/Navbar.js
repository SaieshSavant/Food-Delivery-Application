import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext'; // Import CartContext
import Cookies from 'js-cookie'; // Import Cookies library

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("authToken"); // Remove authToken from Cookies
    navigate("/Login");
  };

  const handleCart = () => {
    navigate("/Cart");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: "#331800" }}>
      <div className="container-fluid">
        <Link className="navbar-brand fs-10" to="/">Go Food</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
            </li>
            {Cookies.get("authToken") && // Check if authToken exists in Cookies
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/MyOrders">My Orders</Link>
              </li>
            }
          </ul>
          {!Cookies.get("authToken") ? // Check if authToken exists in Cookies
            <div className='d-flex'>
              <Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/Signup">Signup</Link>
            </div>
            :
            <div>
              <div className='btn bg-white text-success mx-2' onClick={handleCart}>
                My Cart{" "}
                {cartItems.length > 0 && <span className="badge bg-danger">{cartItems.length}</span>}
              </div>
              <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                Logout
              </div>
            </div>
          }
        </div>
      </div>
    </nav>
  );
}
