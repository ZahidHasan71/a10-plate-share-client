import React from 'react';
import { useLoaderData } from 'react-router';

const AvailableFoods = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div>
            AvailableFoods
        </div>
    );
};

export default AvailableFoods;