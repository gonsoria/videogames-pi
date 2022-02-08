import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getVideoGames } from '../redux/actions'
import AllCards from './AllCards';
import SideBar from './SideBar';
import SearchBar from './SearchBar';

export default function Home() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideoGames())
    }, [dispatch])

    return (
        <div>
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
