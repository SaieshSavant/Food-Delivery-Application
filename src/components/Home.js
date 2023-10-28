import React from 'react'
import { useEffect,useState } from 'react'
import Footer from './Footer'
import Card from './Card'
import Navbar from './Navbar'



export default function Home() {
const [search,setSearch]=useState('');
const [foodcat,setfoodcat]=useState([]);
const [fooditem,setfooditem]=useState([]);

const loaddata=async ()=>{
  let response=await fetch("http://localhost:5000/api/fooddata",{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    }
  });

  response=await response.json();
  setfoodcat(response[1]);
  setfooditem(response[0]);
//console.log(response[0],response[1]);
}

useEffect(()=>{
  loaddata();
},[])
  
  return (
    <div>
     <div><Navbar/></div>   
     <div>
      
     <div id="carouselExampleCaptions" className="carousel slide" d-flex style={{ "maxHeight": "`1000px", "objectFit": "contain !important" }} data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img height={700} src="https://source.unsplash.com/random/?burger" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <div class="d-flex justify-content-center">
                <input class="form-control me-2 text-white" type="search" style={{ "backgroundColor": "black" }} placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img height={700} src="https://source.unsplash.com/random/?food" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <form class="d-flex">
                <input class="form-control me-2 text-white" type="search" style={{ "backgroundColor": "black" }} placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                
              </form>
            </div>
          </div>
          <div className="carousel-item">
            <img height={700} src="https://source.unsplash.com/random/?pizza" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <form class="d-flex">
                <input class="form-control me-2 text-white" type="search" style={{ "backgroundColor": "black" }} placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                
              </form>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

     </div>

     <div className='container'>
      {
        foodcat!==[]?
        foodcat.map((data)=>{
          return(<div className='row mb-3'> 
            <div key={data._id} style={{color:"white"}} className='fs-2 m-2 '>{data.CategoryName}</div>
           <hr/>
           {
            fooditem !==[]?
            fooditem.filter((item)=> (item.CategoryName === data.CategoryName)  &&  (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
            .map(
              filteritems=>{
                return (
                  <div key={filteritems._id} className='col-12 col-md-6 col-lg-3'>
                    <Card fooditem={filteritems}
                    options={filteritems.options[0]}
                    
                    ></Card>
                  </div>
                )
              }
            )
           :<div> No Such data found</div>}
            </div>
          )
        }):""
      }
     
      </div>
     
     
     <div><Footer/></div>
    </div>
  )
}
