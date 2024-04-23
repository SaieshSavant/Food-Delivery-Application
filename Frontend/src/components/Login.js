import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let Navigate=useNavigate();
    const Handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            localStorage.setItem("authToken",json.authToken);
            console.log(localStorage.getItem("authToken"));
            alert("Enter valid credentials");
        }
        if (json.success) {
            localStorage.setItem("authToken",json.authToken);
            console.log(localStorage.getItem("authToken"));
          Navigate("/");

      }


    }
    const onchange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

  return (
    <>
    <div className='container' style={{backgroundImage:'url("https://img.freepik.com/free-photo/flat-lay-burger-fries-wooden-board-with-copyspace_23-2148238459.jpg")', height: '100vh', backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition:"center",maxWidth:"1600px" }}>
       <div >
        <form onSubmit={Handlesubmit} style={{marginLeft:"500px"}} >
            
            <div className="mb-3" style={{paddingTop:"70px"}}>
                <label htmlFor="exampleInputEmail1 " style={{ color: 'white' }} className="form-label">Email address</label>
                <input type="email" className="form-control white-text" style={{ "backgroundColor": "black","color":"white" ,width:"540px"}} name='email' value={credentials.email} onChange={onchange} />

            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" style={{ color: 'white' }} className="form-label">Password</label>
                <input type="password" className="form-control white-text" style={{ "backgroundColor": "black","color":"white" ,width:"540px"}} name='password' value={credentials.password} onChange={onchange} />
            </div>
           

            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/Signup" className='m-3 btn btn-danger'>I am new user</Link>
        </form>
        </div>
    </div>

</>
  )
}
