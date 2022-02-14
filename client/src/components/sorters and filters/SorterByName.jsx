import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getVideoGames, sortVideoGamesAsc, sortVideoGamesDesc } from '../../redux/actions'
import styles from '.././styles/SelectBox.module.css'


export default function SorterByName() {
    const dispatch = useDispatch();
    const history = useHistory()

    const handleChange = (e) => {
        if (e.target.value === 'default') {
            dispatch(getVideoGames())
        }
        else if (e.target.value === 'A') {
            dispatch(sortVideoGamesAsc())
        } else if (e.target.value === 'Z') {
            dispatch(sortVideoGamesDesc())
        }

        history.push('/app/home')
    }


    useEffect(() => {
    }, [dispatch])

    return (
        <div className={styles.box}>
            <select onChange={handleChange} >
                <option value='Orden' >Name</option>
                <option value='default'>Default</option>
                <option value='A'>A-Z</option>
                <option value='Z'>Z-A</option>
            </select>
        </div>
    );
}
