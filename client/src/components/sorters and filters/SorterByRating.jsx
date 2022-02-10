import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sortRatingAsc, sortRatingDesc } from '../../redux/actions'

export default function SorterByRating() {

    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.value === 'lower') {
            dispatch(sortRatingAsc())
        } else if (e.target.value === 'higher') {
            dispatch(sortRatingDesc())
        }
    }

    useEffect(() => { }, [dispatch])

    return (
        <div>
            <select onChange={handleChange}>
                <option value='Rating'>Selecciona un orden</option>
                <option value='lower'>Menor rating</option>
                <option value='higher'>Mayor rating</option>
            </select>
        </div>
    );
}
