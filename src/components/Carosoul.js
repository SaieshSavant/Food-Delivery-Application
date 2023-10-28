import React from 'react'

export default function Carosoul() {
  return (
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
              <form class="d-flex">
                <input class="form-control me-2 text-white" type="search" style={{ "backgroundColor": "black" }} placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-success text-white" type="submit">Search</button>
              </form>
            </div>
          </div>
          <div className="carousel-item">
            <img height={700} src="https://source.unsplash.com/random/?food" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <form class="d-flex">
                <input class="form-control me-2 text-white" type="search" style={{ "backgroundColor": "black" }} placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-success text-white" type="submit">Search</button>
              </form>
            </div>
          </div>
          <div className="carousel-item">
            <img height={700} src="https://source.unsplash.com/random/?pizza" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <form class="d-flex">
                <input class="form-control me-2 text-white" type="search" style={{ "backgroundColor": "black" }} placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-success text-white" type="submit">Search</button>
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
  )
}
