import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/Card.module.css'

export default function Card({ id, name, img, genres, rating }) {
    return (
        <div key={id} className={styles.card_container}>
            <div className={styles.cardImg_container}>
                <Link to={`/app/videogame/${id}`}>
                    <img src={img} alt="imagen" width='300px' className={styles.img} />
                </Link>
            </div>
            <div className={styles.details}>
                <h1 className={styles.cardName}> {name} </h1>
                <div className={styles.gameData_container}>
                    <div className={styles.cardGenre_container}>
                        {genres?.map((ge, index) => <h4 key={index}>{ge}</h4>)}
                    </div>
                    <h4 className={styles.rating}>★{rating}</h4>
                </div>
            </div>
        </div >
    )
}; 
