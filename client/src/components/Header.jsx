import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getVideoGames } from '../redux/actions'
import styles from './styles/Header.module.css'

export default function Header() {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(getVideoGames())
    }
    return (
        <div className={styles.header}>
            <div className={styles.button_container}>
                <Link to='/app/home' >
                    <button onClick={handleChange} className={styles.header_button}>Home</button>
                </Link>
            </div>
            <div className={styles.title_container}>
                <h1 className={styles.title}>VideoGame App</h1>
            </div>
        </div>
    )
}
