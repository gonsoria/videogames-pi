import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { filterByType, getVideoGames, filterTypeStatus, getFilteredGames } from '../../redux/actions';

export default function FilterByType() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideoGames())
    }, [dispatch])

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