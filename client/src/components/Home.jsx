import React from 'react';
import AllCards from './AllCards';
import SideBar from './SideBar';
import SearchBar from './SearchBar';
import styles from './styles/Home.module.css'

export default function Home() {

    return (
        <div className={styles.home}>
            <div className={styles.sideBar}>
                <SideBar />
            </div>
            <div className={styles.app_container}>
                <SearchBar />
                <AllCards />
            </div>
        </div>
    );
}
