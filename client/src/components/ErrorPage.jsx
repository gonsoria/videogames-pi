import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/ErrorPage.module.css'
import notfound from '../assets/404.png'
import { useDispatch } from 'react-redux'
import { setError500 } from '../redux/actions'

export default function ErrorPage() {
    const dispatch = useDispatch()

    const handleClick = (e) => {
        dispatch(setError500())
    }


    return (
        <div className={styles.bkg} >
            <div className={styles.error_container}>
                <h2>ERROR!</h2>
                <img src={notfound} alt='not found img' />
                <div>
                    <h2>Nothing to see here...</h2>
                    <Link to='/app/home'>
                        <button onClick={handleClick}>
                            Back to GamerSpot
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
