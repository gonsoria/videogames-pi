import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { filterByType, getVideoGames } from '../../redux/actions';

export default function FilterByType() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideoGames())
    }, [dispatch])

    const handleChange = (e) => {
        if (e.target.value === 'all') {
            dispatch(getVideoGames())
        } else {
            dispatch(filterByType(e.target.value))
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