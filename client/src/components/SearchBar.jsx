import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchVideoGame } from '../redux/actions';
import styles from './styles/SearchBar.module.css'

export default function SearchBar() {
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();

    const handleInput = (e) => {
        setSearch(e.target.value)
    }


    // const handleSearch = () => {
    //     dispatch(searchVideoGame(search))
    //     setSearch('')
    // }
    const handleSearch = () => {
        dispatch(searchVideoGame(search))
        setSearch('')
    }

    return (
        <div className={styles.searchBar_container}>
            <input type='text' placeholder='Search videogame' onChange={handleInput} value={search} className={styles.searchBar_input} />

            <button className={styles.searchBar_button} onClick={handleSearch}>Search</button>

            <Link to="/app/create">
                <input className={styles.searchBar_create} type="button" value="Create videogame" />
            </Link>
        </div>
    );
}
