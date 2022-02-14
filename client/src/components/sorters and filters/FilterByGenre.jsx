import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideoGamesGenres, filterByGenre, getVideoGames } from '../../redux/actions';
import styles from '.././styles/SelectBox.module.css'

export default function FilterByGenre() {
    const myState = useSelector(state => state.videoGamesGenres)

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getVideoGamesGenres())
    }, [dispatch])

    const handleGenre = (e) => {
        if (e.target.value === 'all') {
            dispatch(getVideoGames())
        } else {
            dispatch(filterByGenre(e.target.value))
        }
    }


    return (
        <div className={styles.box}>
            <select name='genres' onChange={handleGenre} >
                <option value=''> Genre</option>
                <option value='all'> All genres </option>
                {myState?.map(gen =>
                    <option key={gen.id} value={gen.name} > {gen.name} </option>
                )}
            </select>
        </div>
    )
}
