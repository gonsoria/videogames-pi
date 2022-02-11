import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideoGamesGenres, filterByGenre, getVideoGames } from '../../redux/actions';

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
        <div>
            <select name='genres' onChange={handleGenre}>
                <option value=''> Seleccione genero</option>
                <option value='all'> Todos </option>
                {myState?.map(gen =>
                    <option key={gen.id} value={gen.name} > {gen.name} </option>
                )}
            </select>
        </div>
    )
}
