import React from 'react';
import { Link } from 'react-router-dom';

export default function SearchBar() {
    return (
        <div>
            <input type='text' placeholder='Search videogame' />
            <button>Search</button>
            <Link to="/create">
                <input type="button" value="Create videogame" />
            </Link>
        </div>
    );
}
