import React from 'react'
import { useEffect,useState } from 'react'
import Footer from './Footer'
import Card from './Card'




export default function Home() {
const [search,setSearch]=useState('');
const [foodcat,setfoodcat]=useState([]);
const [fooditem,setfooditem]=useState([]);

const loaddata=async ()=>{
  let response=await fetch("http://localhost:4000/api/fooddata",{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    }
  });

  response=await response.json();
  setfoodcat(response[1]);
  setfooditem(response[0]);
console.log(response[0],response[1]);
}

useEffect(()=>{
  loaddata();
},[])
  
  return (
    <div>
      
     <div>
      
     <div id="carouselExampleCaptions" className="carousel slide" d-flex style={{ "maxHeight": "`1000px", "objectFit": "contain !important" }} data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img height={700} src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D" className="d-block w-100"  alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <div class="d-flex justify-content-center">
                <input class="form-control me-2 text-black" type="search" style={{ "backgroundColor": "white" }} placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                
              </div>  
            </div>
          </div>
          <div className="carousel-item">
            <img height={700} src="https://miro.medium.com/v2/resize:fit:1400/0*oTfm1pTXLxitHHFy.jpg" className="d-block w-100"  alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <form class="d-flex">
                <input class="form-control me-2 text-black" type="search" style={{ "backgroundColor": "white" }} placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                
              </form>
            </div>
          </div>
          <div className="carousel-item">
            <img height={700} src="https://img.freepik.com/free-photo/cheeseburgers-with-fry-potato-wooden-board_114579-33844.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704672000&semt=ais" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <form class="d-flex">
                <input class="form-control me-2 text-black" type="search" style={{ "backgroundColor": "white" }} placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                
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
       
        foodcat.map((data)=>{
          return(<div className='row mb-3'> 
            <div key={data._id} style={{color:"white"}} className='fs-2 m-2 '>{data.CategoryName}</div>
           <hr/>
           {
           
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
           }
            </div>
          )
        })
      }
     
      </div>
     
     
<Footer/>
    </div>
  )
}
