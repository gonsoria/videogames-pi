import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getVideoGames, setLoader } from '../redux/actions'
import styles from './styles/Header.module.css'

export default function Header() {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(setLoader())
        dispatch(getVideoGames())
    }
    return (
        <div className={styles.header}>

            <Link to='/app/home' onClick={handleChange}>
                <div className={styles.title_container}>
                    <h1 className={styles.title}>
                        GAMERSPOT
                    </h1>
                </div>
            </Link>
        </div>
    )
}
