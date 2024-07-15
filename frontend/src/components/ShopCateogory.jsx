import React,{useContext} from 'react';
import { ShopContext } from '../Context/ShopContext';
import Navbar from './Navbar';
// import Product_card from './product_card'
import {Link} from 'react-router-dom';
const ShopCateogory = (props) =>{
    const {all_product} = useContext(ShopContext);
    return(
        <div>
      <Navbar/>
      <div className='m-4 px-1 py-2'>
        <div>
            <img src={props.banner} alt=""/>
        </div>
        <div className=' mt-4 flex justify-between gap-2 flex-wrap'>
        {/* {all_product.map((product,i) => (
        <div key={product.id} className='w-80'>
          <img src={product.image} alt={product.name}/>
          <h3>{product.name}</h3>
          <p>New Price: ${product.new_price}</p>
          <p>Old Price: <s>${product.old_price}</s></p>
        </div>
      ))} */}
          {all_product.map((product,i)=>{
            if(props.category===product.category){
              return(
                <div key={product.id} className='w-80'>
                <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name}/></Link>
                <h3>{product.name}</h3>
                <p>New Price: ${product.new_price}</p>
                <p>Old Price: <s>${product.old_price}</s></p>
                </div>
              ) 
            }
          })}
        </div>
      </div>
    </div>
    )
}
 export default ShopCateogory;