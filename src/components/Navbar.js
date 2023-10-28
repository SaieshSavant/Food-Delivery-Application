import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'

import Badge from 'react-bootstrap/Badge'
export default function Navbar() {
    const navigate=useNavigate();
    const handlelogout= ()=>{
       localStorage.removeItem("authToken");
       navigate("/Login");
    }
    const handlecart= ()=>{
        navigate("/Cart");
     }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand"fs-10 to="/" >Go Food</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>

                            {(localStorage.getItem("authToken"))?
                               <li className="nav-item">
                               <Link className="nav-link active fs-5" aria-current="page" to="/">My orders</Link>
                           </li>
                        :""}
                        </ul>

                        {(!localStorage.getItem("authToken"))?
                    <div className='d-flex'>
                        <Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
                     
                        <Link className="btn bg-white text-success mx-1" to="/Createuser">Signup</Link>
                    </div>  
                    :
                    <div>
                     <div className='btn bg-white text-success mx-2' onClick={handlecart}>
                        My Cart{" "}
                        <Badge pill bg="danger">2</Badge>
                    </div>
                    <div className='btn bg-white text-danger mx-2' onClick={handlelogout}>
                        Logout
                    </div>
                    </div>
                    }                  
                    </div>
                </div>
            </nav>
        </div>
    )
}