import React from 'react';
import { Link } from 'react-router-dom';
import AllCards from './AllCards';
import SideBar from './SideBar';
import SearchBar from './SearchBar';

export default function Home() {
    return (
        <div>
            <Link to='/home'>Home</Link>
            <div>
                <SearchBar />
            </div>
            <div>
                <SideBar />
            </div>
            <div>
                <AllCards />
            </div>
        </div>
    );
}
