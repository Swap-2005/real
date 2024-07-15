import React, { useEffect, useState } from "react";
import { featured as staticFeatured } from "../../data/Data";
import {useHistory } from "react-router-dom";

const FeaturedCard = () => {
  const [featured, setFeatured] = useState(staticFeatured);
  const history = useHistory();

  useEffect(() => {
    fetch('http://localhost:5000/category-counts')
      .then((response) => response.json())
      .then((data) => {
        const updatedFeatured = staticFeatured.map(item => {
          const countItem = data.find(d => d.category === item.name);
          return {
            ...item,
            total: countItem ? `${countItem.count} Property` : item.total,
          };
        });
        setFeatured(updatedFeatured);
      })
      .catch((error) => console.error("Error fetching category counts:", error));
  }, []);

  const handleClick = (category) => {
    history.push({
      pathname: '/featured-plots',
      state: { category }
    });
  };

  return (
    <>
      <div className='content grid5 mtop'>
        {featured.map((items, index) => (
          <div className='box' key={index} onClick={() => handleClick(items.name)}>
            <img src={items.cover} alt='' />
            <h4>{items.name}</h4>
            <label>{items.total}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedCard;
