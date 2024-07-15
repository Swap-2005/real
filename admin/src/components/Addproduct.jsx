import React, { useState } from 'react'
import upload_area from '../components/Assets/Admin_Assets/upload_area.svg';

const Addproduct = () => {
    const[image,setImage]=useState(false);
    const [productDetails,setProductDetails]=useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })
    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) =>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    const Add_Product = async ()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product', image);
        await fetch('http://localhost:5000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((res)=>res.json()).then((data)=>{responseData=data})

        if(responseData.success)
        {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:5000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((res)=>res.json()).then((data)=>{
                data.success?alert('Product Added'):alert('Failed')
            })
        }
    }

  return (
    <div className='w-[80%] h-screen bg-gray-200'>
        <div>
            <form className='flex-col flex gap-4 items-start bg-white h-screen p-6'>
                <label htmlFor="title">Product Title</label>
                <input value={productDetails.name} onChange={changeHandler} type="text" id="title" placeholder='Type here' name='name' className='bg-transparent border-2 border-black rounded-lg p-2 w-full'/>
                <div className='flex gap-10'>
                <div className='flex-col'>
                <div><label htmlFor="old_price">Price</label></div>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' id="old_price" placeholder='Type here' className='bg-transparent border-2 border-black rounded-lg p-2 w-full'/>
                </div>
                <div className='flex-col'>
                <div><label htmlFor="new_price">OfferPrice</label></div>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" id="new_price" name='new_price' placeholder='Type here' className='bg-transparent border-2 border-black rounded-lg p-2 w-full'/>
                </div>
                </div>
                <label htmlFor="category">Category</label>
                <select value={productDetails.category} onChange={changeHandler} name="category" id="category">
                    <option value="women">Women</option>
                    <option value="men">men</option>
                    <option value="kid">Kid</option>
                </select>
                <label htmlFor="productimage" className='font-medium'>Product Photo <img src={image?URL.createObjectURL(image):upload_area} alt="" className='w-40 h-44'/></label>
                <input onChange={imageHandler} type="file" name='image' id='productimage' hidden/>
                <button type="button" onClick={Add_Product} className='border-2 border-blue-400 bg-blue-400 rounded-lg px-10 py-1'>ADD</button>
            </form>
        </div>
    </div>
  )
}

export default Addproduct