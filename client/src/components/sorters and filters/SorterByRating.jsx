import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getVideoGames, sortRatingAsc, sortRatingDesc } from '../../redux/actions'
import styles from '.././styles/SelectBox.module.css'


export default function SorterByRating() {
    const dispatch = useDispatch();
    const history = useHistory();


    const handleChange = (e) => {
        if (e.target.value === 'default') {
            dispatch(getVideoGames())
        }
        else if (e.target.value === 'lower') {
            dispatch(sortRatingAsc())
        } else if (e.target.value === 'higher') {
            dispatch(sortRatingDesc())
        }
        history.push('/app/home')
    }

    useEffect(() => { }, [dispatch])

    return (
        <div className={styles.box}>
            <select onChange={handleChange}>
                <option value='Rating'>Rating</option>
                <option value='default'>Default</option>
                <option value='lower'>Lower rating</option>
                <option value='higher'>Higher rating</option>
            </select>
        </div>
    );
}
