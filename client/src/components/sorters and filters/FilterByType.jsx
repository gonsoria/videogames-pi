import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByType, filterTypeStatus, getFilteredGames, getVideoGames } from '../../redux/actions';
import styles from '.././styles/SelectBox.module.css'


export default function FilterByType() {
    const filteredGames = useSelector(state => state.filteredVideoGames)
    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.value === 'all') {
            if (filteredGames.length < 1) {
                dispatch(getVideoGames())
                dispatch(filterTypeStatus(false))
            } else {
                dispatch(getFilteredGames())
                dispatch(filterTypeStatus(false))
            }
        } else {
            dispatch(filterByType(e.target.value))
            dispatch(filterTypeStatus(true))
        }
    }

    return (
        <div className={styles.box}>
            <select onChange={handleChange}>
                <option>Type</option>
                <option value='all'>All games</option>
                <option value='true'>User games</option>
            </select>
        </div>
    )
}