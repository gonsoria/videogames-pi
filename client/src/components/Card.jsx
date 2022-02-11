import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/Card.module.css'

export default function Card({ id, name, img, genres }) {
    return (
        <div key={id} className={styles.card_container}>
            <div className={styles.cardName_container}>
                <h1> {name} </h1>
            </div>
            <Link to={`/app/videogame/${id}`} className={styles.cardImg_container}>
                <img src={img} alt="imagen" width='300px' />
            </Link>
            <div className={styles.cardGenre_container}>
                {genres?.map((ge, index) => <h4 key={index}>{ge}</h4>)}
            </div>
        </div >
    )
}; 
