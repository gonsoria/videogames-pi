import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sortVideoGamesAsc, sortVideoGamesDesc } from '../../redux/actions'

export default function SorterByName() {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.value === 'A') {
            dispatch(sortVideoGamesAsc())
        } else if (e.target.value === 'Z') {
            dispatch(sortVideoGamesDesc())
        }
    }

    useEffect(() => {
    }, [dispatch])

    return (
        <div>
            <select onChange={handleChange}>
                <option value='Orden'>Selecciona un orden</option>
                <option value='A'>A-Z</option>
                <option value='Z'>Z-A</option>
            </select>
        </div>
    );
}
