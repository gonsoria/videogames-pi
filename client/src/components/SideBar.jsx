import React from 'react';
import FilterByGenre from './sorters and filters/FilterByGenre';
import FilterByType from './sorters and filters/FilterByType';
import SorterByName from './sorters and filters/SorterByName';
import SorterByRating from './sorters and filters/SorterByRating';

export default function NavBar() {
    return (
        <div>
            <div>
                <h2>Order</h2>
                <SorterByName />
                <h2>Rating</h2>
                <SorterByRating />
                <h2>Genres</h2>
                <FilterByGenre />
                <h2>Type</h2>
                <FilterByType />
            </div>
        </div>
    );
}
