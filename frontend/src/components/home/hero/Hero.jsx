import React, { useState } from "react";
import Heading from "../../common/Heading";
import "./hero.css";
import { useHistory } from "react-router-dom";

const Hero = () => {
  const [buySell, setBuySell] = useState("Buy");
  const [location, setLocation] = useState("Nizamabad");
  const [category, setCategory] = useState("Open Plots");
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/allplots/${location}/${category}`);
  };

  return (
    <section className="hero">
      <div className="container">
        <Heading title="Search Your Next Home " subtitle="Find new & featured properties located in your local city." />

        <form className="flex" onSubmit={handleSearch}>
          <div className="box">
            <span>Buy</span>
            <select className="dropdown" name="BuySell" id="BuySell" value={buySell} onChange={(e) => setBuySell(e.target.value)}>
              <option value="Buy">Buy</option>
            </select>
          </div>
          <div className="box">
            <span>City/Street</span>
            <select className="dropdown" name="location" id="city" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="Nizamabad">Nizamabad</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>
          <div className="box">
            <span>Property Type</span>
            <select className="dropdown" name="category" id="propertyType" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Open Plots">Open Plots</option>
              <option value="House/Villa">House/Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Farm/Agricultural Lands">Farm/Agricultural Lands</option>
              <option value="Commercial Properties/Shops">Commercial Properties/Shops</option>
            </select>
          </div>
          <button className="btn1" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
