import React from 'react'
import { useDispatch } from 'react-redux'
import { filterByType, filterTypeStatus, getFilteredGames } from '../../redux/actions';

export default function FilterByType() {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.value === 'all') {
            dispatch(getFilteredGames())
            dispatch(filterTypeStatus(false))
        } else {
            dispatch(filterByType(e.target.value))
            dispatch(filterTypeStatus(true))

        }
    }
    return (
        <div>
            <select onChange={handleChange}>
                <option></option>
                <option value='all'>Todos los juegos</option>
                <option value='true'>Creados por el usuario</option>
            </select>
        </div>
    )
}