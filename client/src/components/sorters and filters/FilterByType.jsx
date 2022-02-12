import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByType, filterTypeStatus, getFilteredGames, getVideoGames } from '../../redux/actions';

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
        <div>
            <select onChange={handleChange}>
                <option>Tipo de juego</option>
                <option value='all'>Todos los juegos</option>
                <option value='true'>Creados por el usuario</option>
            </select>
        </div>
    )
}