import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './Contextreducer';

export default function Card(props) {
  let dispatch=useDispatchCart();
  let data=useCart();
  let priceref=useRef();
  let options = props.options;
  let priceoptions = Object.keys(options);
  const [qty,setqty]=useState(1)
  const [size,setsize]=useState("")
  const handleaddcart =async()=>{
     await dispatch({type:"ADD",id:props.fooditem._id,name:props.fooditem.name,price:finalprice,qty:qty,size:size})
     console.log(data)
  }

let finalprice=qty *parseInt(options[size]);
useEffect(() =>{
   setsize(priceref.current.value)
},[])

  return (
    <div>
      <div className="card m-2" style={{ "width": "18rem","maxHeight": "100", objectFit: "contain" ,backgroundColor:"black"}}>
        <img src={props.fooditem.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title text-white">{props.fooditem.name}</h5>

          <div className='container'>
            <select className='m-3 h-100 bg-success rounded text-white' onChange={(e)=> setqty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option  key={i + 1}>{i + 1}</option>
                )
              })}
            </select>
            <select className='m-3 h-4 bg-success text-white' ref={priceref} onChange={(e)=> setsize(e.target.value)}>
              {priceoptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <div className='d-inline h-100 fs-5 text-white'>
            Total Price: Rs.{finalprice}/-
            </div>
          </div>
          <hr></hr>
          <button className={'btn btn-success justify-center ms-2 text-white'}onClick={handleaddcart} >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  )
}
