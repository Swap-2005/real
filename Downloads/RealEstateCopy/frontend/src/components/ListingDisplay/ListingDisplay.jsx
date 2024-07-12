import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import './ListingDisplay.css'; // Import your CSS file

const ListingDisplay = ({ plot }) => {
    const { addToCart } = useContext(ShopContext);

    return (
        <>
            <div className='listing-display'>
                <div className='flex'>
                    
                    <div className='main-image'>
                        <img src={plot.image} alt="" />
                    </div>
                </div>
                <div className='product-details'>
                    <h1 className='product-title'>{plot.title}</h1>
                    <div className='product-info'>
                        <div>{plot.size} sqft</div>
                        <div>{plot.price}</div>
                    </div>
                    <div className='product-description'>
                        {plot.description}
                    </div>
                    <button onClick={() => { addToCart(plot.id) }} className='add-to-cart'>ADD TO CART</button>
                    <p><span className='product-category'>Category: </span>{plot.category}</p>
                </div>
            </div>
        </>
    );
};

export default ListingDisplay;
