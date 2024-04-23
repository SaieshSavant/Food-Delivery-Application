import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, geolocation } = credentials;

        // Fetch the current location using Geolocation API
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
            
            // Make API call to create user with the fetched location
            fetch("http://localhost:4000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, location })
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if (json.success) {
                    localStorage.setItem("authToken", json.authToken);
                    console.log(localStorage.getItem("authToken"));
                    navigate("/");
                } else {
                    alert("Enter valid credentials");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error creating user");
            });
        });
    };
    
    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
                    setCredentials({ ...credentials, geolocation: location });
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Error getting current location');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    return (
        <div className='container' style={{backgroundImage:'url("https://img.freepik.com/premium-photo/food-background-cooking-old-background-free-copy-space-top-view_187166-30740.jpg")', height: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition:"center", maxWidth:"1600px" }}>
            <form onSubmit={handleSubmit} style={{marginLeft:"500px"}}>
                <div className="mb-3" style={{paddingTop:"70px"}}>
                    <label htmlFor="name" style={{ color: 'white' }} className="form-label">Name</label>
                    <input type="text" className="form-control white-text" style={{ backgroundColor: "black", color: "white", width: "540px" }} name='name' value={credentials.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" style={{ color: 'white' }} className="form-label">Email address</label>
                    <input type="email" className="form-control white-text" style={{ backgroundColor: "black", color: "white", width: "540px" }} name='email' value={credentials.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" style={{ color: 'white' }} className="form-label">Password</label>
                    <input type="password" className="form-control white-text" style={{ backgroundColor: "black", color: "white", width: "540px" }} name='password' value={credentials.password} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="geolocation" style={{ color: 'white' }} className="form-label">Address</label>
                    <input type="text" className="form-control white-text" style={{ backgroundColor: "black", color: "white", width: "540px" }} name='geolocation' value={credentials.geolocation} onChange={handleChange} />
                    <button type="button" className="btn btn-danger" onClick={handleLocationClick}>
                        Use Current Location
                    </button>
                </div>

                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
            </form>
        </div>
    );
}
