import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchVideoGame } from '../redux/actions';

export default function SearchBar() {
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();

    const handleInput = (e) => {
        setSearch(e.target.value)
    }


    const handleSearch = () => {
        dispatch(searchVideoGame(search))
        setSearch('')
    }

    return (
        <div>
            <input type='text' placeholder='Search videogame' onChange={handleInput} value={search} />

            <button onClick={handleSearch}>Search</button>

            <Link to="/create">
                <input type="button" value="Create videogame" />
            </Link>
        </div>
    );
}
