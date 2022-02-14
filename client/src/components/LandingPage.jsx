import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/LandingPage.module.css'

export default function LandingPage() {
    return (
        <div>
            <div className={styles.landing_image}>
            </div>
            <div className={styles.landing_text}>
                <h1>GAMERSPOT</h1>
                <div className={styles.button_container}>
                    <Link to='/app/home' >
                        <button className={styles.landing_button} >START</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
