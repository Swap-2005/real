import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ListingDisplay from './ListingDisplay';

const Listing = () => {
    const { all_plots } = useContext(ShopContext);
    const { id } = useParams();
    const plot = all_plots.find((e) => e.id === Number(id));

    if (!plot || !all_plots || all_plots.length === 0) {
        return <div>Loading...</div>; // Handle loading state or error state
    }

    return (
        <div>
            <ListingDisplay plot={plot} />
        </div>
    );
};

export default Listing;
