import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel CSS
import './ListingDisplay.css'; // Import your CSS file

const ListingDisplay = ({ plot }) => {
    const { addToCart } = useContext(ShopContext);

    return (
        <div className='listing-display'>
            <div className='carousel-container'>
                <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
                    {plot.images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`Plot image ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className='product-details'>
                <h1 className='product-title'>{plot.title}</h1>
                <div className='product-info'>
                    <div>{plot.size}</div>
                    <div>{plot.price}</div>
                </div>
                <p><span className='product-category'>Nearby: </span>{plot.nearby}</p>
                {/* <div className='product-description'>
                    {plot.nearby}
                </div> */}
                <div className='product-description'>
                    {plot.description}
                </div>
                <button onClick={() => { addToCart(plot.id) }} className='add-to-cart'>ADD TO CART</button>
                <p><span className='product-category'>Category: </span>{plot.category}</p>
            </div>
        </div>
    );
};

export default ListingDisplay;
