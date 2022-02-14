import React from 'react';
import AllCards from './AllCards';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import styles from './styles/Home.module.css'

export default function Home() {

    return (
        <div className={styles.home}>
            <div className={styles.home_bkg}></div>
            <div className={styles.sideBar}>
                <NavBar />
            </div>
            <div className={styles.app_container}>
                <SearchBar />
                <AllCards />
            </div>
        </div>
    );
}
