import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Plots = (props) => {
  const [allPlots, setAllPlots] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/allplots')
      .then((response) => response.json())
      .then((data) => setAllPlots(data));
  }, []);

  return (
    <>
      <div className='content grid3 mtop'>
        {allPlots.map((val, index) => {
          const { images, category, location, name, price, size } = val;
          if (props.location.toLowerCase() === location.toLowerCase() && props.category.toLowerCase() === category.toLowerCase()){
          return (
            
            <div className='box shadow' key={index}>
                
              <div className='img'>
              <Link to={`/plot/${val.id}`}><img src={images[0]} alt='' /></Link>
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: category === "For Sale" ? "#25b5791a" : "#ff98001a", color: category === "For Sale" ? "#25b579" : "#ff9800" }}>{category}</span>
                  <i className='fa fa-heart'></i>
                </div>
                <h4>{name}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {location}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2'>${price}</button> <label htmlFor=''>/sqft</label>
                </div>
                <span>{size}</span>
              </div>
            </div>
          )}
        })}
      </div>
    </>
  );
}

export default Plots;
