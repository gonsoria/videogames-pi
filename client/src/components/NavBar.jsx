import React from 'react';
import FilterByGenre from './sorters and filters/FilterByGenre';
import FilterByType from './sorters and filters/FilterByType';
import SorterByName from './sorters and filters/SorterByName';
import SorterByRating from './sorters and filters/SorterByRating';
import styles from './styles/NavBar.module.css'

export default function NavBar() {
    return (
        <div className={styles.sideBar_container}>
            <h2>SORT BY</h2>
            <SorterByName />
            <SorterByRating />
            <h2>FILTER BY</h2>
            <FilterByGenre />
            <FilterByType />
        </div>
    );
}
