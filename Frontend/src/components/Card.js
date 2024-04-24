import React, { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '../components/CartContext'; // Import CartContext
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies library

export default function Card(props) {
  const { addToCart } = useContext(CartContext);
  const priceref = useRef();
  const options = props.options;
  const priceoptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceoptions[0]); 
  const navigate = useNavigate();
  
  const handleAddToCart = () => {
    if (Cookies.get("authToken")) { // Check if authToken exists in Cookies
      const finalPrice = qty * parseInt(options[size]);
      addToCart({ id: props.fooditem._id, name: props.fooditem.name, price: finalPrice, quantity: qty, size});
    } else {
      navigate("/Login");
    }
  };

  useEffect(() => {
    setSize(priceref.current.value);
  }, [options]);

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  return (
    <div >
      <div className="card m-2" style={{ "width": "18rem", maxHeight: "26rem", backgroundColor: "#F6E8B1" }}>
        <img src={props.fooditem.img} className="card-img-top" alt="..." style={{ maxHeight: "164px", objectFit: "fill" }} />
        <div className="card-body"style={{marginTop:"-10px"}}>
          <h5 className="card-title " style={{ color:"#331800" }}>{props.fooditem.name}</h5>
          <h6 className="card-title " style={{ color:"#331800" }}>{props.fooditem.description.substring(0,50)+"....."}</h6>
          <div className='container' style={{ margin:"-10px" }}>
            <div>
              <select className='m-3 h-100 rounded text-white' style={{ backgroundColor: "#331800" }} onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1}>{i + 1}</option>
                  )
                })}
              </select >
              <select className='m-3 h-4 text-white' style={{ backgroundColor: "#331800" }} ref={priceref} onChange={handleSizeChange}>
                {priceoptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
            </div>
            <h5 style={{ color:"#331800" }}>Total Price Rs.{qty * parseInt(options[size])}/-</h5>
          </div>
          <hr></hr>
          <button className={'btn  justify-center text-white'} style={{ backgroundColor: "#331800" }} onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  )
}
