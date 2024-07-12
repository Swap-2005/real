import React, { useState } from 'react';
// import Adminnav from './Adminnav';
import ManagePlots from './ManagePlots';
// import Plot_cart from './Assets/Admin_Assets/Plot_Cart.svg';
// import Plot_list_icon from './Assets/Admin_Assets/Plot_list_icon.svg';
import AddPlot from './Addplot';
const ListPlots = () => {
    const [show, setShow] = useState(true);

    return (
        <div className='bg-gray-200 h-screen w-full'>
            {/* <Adminnav /> */}
            <div className='flex bg-white mt-1'>
                <div className='flex-col h-screen w-[20%] flex gap-5 items-center py-2'>
                    <div>
                        <button onClick={() => { setShow(true) }} className='px-16 py-2 flex gap-3 bg-gray-100'>
                            {/* <img src={Plot_cart} alt="" /> */}
                            Add Plot
                        </button>
                    </div>
                    <div>
                        <button onClick={() => { setShow(false) }} className='px-16 py-2 flex gap-3 bg-gray-100'>
                            {/* <img src={Plot_list_icon} alt="" /> */}
                            Plot List
                        </button>
                    </div>
                </div>
                {show ? <AddPlot /> : <ManagePlots />}
            </div>
        </div>
    )
}

export default ListPlots;
