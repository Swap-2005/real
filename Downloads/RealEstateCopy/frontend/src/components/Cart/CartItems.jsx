import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import remove_icon from '../Assets/Frontend_Assets/cart_cross_icon.png';
import './CartItems.css'; // Import your CSS file
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const CartItems = () => {
    const { all_plots, cartItems, removeFromCart } = useContext(ShopContext);
    
    return (
        <>
            <div className='table-container'>
                <table className='w-full'>
                    <thead className='table-header'>
                        <tr>
                            <th className='px-4 py-2'>Image</th>
                            <th className='px-4 py-2'>Title</th>
                            <th className='px-4 py-2'>Size</th>
                            <th className='px-4 py-2'>Price</th>
                            <th className='px-4 py-2'>Location</th>
                            <th className='px-4 py-2'>Remove</th>
                        </tr>
                    </thead>
                    <tbody className='table-body'>
                        {all_plots.map((plot) => {
                            if (cartItems[plot.id] > 0) {
                                return (
                                    <tr key={plot.id}>
                                        <td className='px-4 py-2'>
                                        <Link to={`/plot/${plot.id}`}><img src={plot.image} alt={plot.title} className='w-18 h-20' /></Link>
                                        </td>
                                        <td className='px-4 py-2'>{plot.title}</td>
                                        <td className='px-4 py-2'>{plot.size.toFixed(2)} sqft</td>
                                        <td className='px-4 py-2'>{(plot.price * cartItems[plot.id]).toFixed(2)}</td>
                                        <td className='px-4 py-2'>{plot.location}</td>
                                        <td className='px-4 py-2'>
                                            <img 
                                                src={remove_icon} 
                                                alt="Remove" 
                                                onClick={() => removeFromCart(plot.id)} 
                                                className='remove-icon'
                                            />
                                        </td>
                                    </tr>
                                );
                            }
                            return null;
                        })}
                    </tbody>
                </table>
            </div>
            
            {/* <div className='cart-totals'>
                <div className='totals-section'>
                    <h1 className='totals-header'>Cart Totals</h1>
                    <div className='totals-item'>
                        <p>SubTotal</p>
                        <p>$0.00</p> Replace with getTotalCartAmount()
                    </div>
                    <hr/>
                    <div className='totals-item'>
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr/>
                    <div className='totals-item'>
                        <h3>Total</h3>
                        <h3>$0.00</h3> Replace with getTotalCartAmount()
                    </div>
                    <button className='checkout-button'>PROCEED TO CHECKOUT</button>
                </div>
                
                <div className='promo-section'>
                    <p className='promo-item'>If you have a promo code, Enter it here</p>
                    <div className='promo-input'>
                        <input type="text" placeholder='promocode' />
                        <button>Submit</button>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default CartItems;
