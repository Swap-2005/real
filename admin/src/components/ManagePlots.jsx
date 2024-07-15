import React, { useState, useEffect } from 'react';
import crossicon from './Assets/Admin_Assets/cross_icon.png';

const ManagePlots = () => {
    const [allPlots, setAllPlots] = useState([]);

    const fetchPlots = async () => {
        await fetch('http://localhost:5000/allplots')
            .then((res) => res.json())
            .then((data) => { setAllPlots(data) });
    }

    useEffect(() => {
        fetchPlots();
    }, []);

    const remove_plot = async (id) => {
        const response = await fetch('http://localhost:5000/removeplot', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Response from server:', data);
        await fetchPlots();
    }

    return (
        <div className='w-[80%] h-screen bg-gray-200'>
            <div className='flex-col flex items-center bg-white m-2 h-screen gap-6'>
                <div><p className='font-semibold text-2xl'>All Plots List</p></div>
                <div className='flex justify-around w-full px-10 font-semibold'>
                    <div className='flex gap-6'>
                        <div>Plot ID</div>
                        <div>Title</div>
                    </div>
                    <div className='flex gap-6'>
                        <div>Category</div>
                        <div>Size</div>
                        <div>Price</div>
                        <div>Location</div>
                        <div>Remove</div>
                    </div>
                </div>
                {
                    allPlots.map((plot, index) => {
                        return <div className='flex justify-around w-full px-10' key={index}>
                            <div className='flex gap-6'>
                                <div><img className='w-14 h-14' src={plot.images[0]} alt="" /></div>
                                <div><p>{plot.title}</p></div>
                            </div>
                            <div className='flex gap-6'>
                                <div><p>{plot.category}</p></div>
                                <div><p>{plot.size} sqft</p></div>
                                <div><p>{plot.price}</p></div>
                                <div><p>{plot.address}</p></div>
                                <div><button onClick={() => { remove_plot(plot.id) }}><img src={crossicon} alt="" /></button></div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default ManagePlots;
