import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getVideoGamesGenres } from '../redux/actions'


export default function Form() {
    //Estados
    const [videoGameData, setVideoGameData] = useState({
        name: '',
        description: '',
        platform: [],
        released: '',
        rating: '',
        img: '',
        created: true
    })
    const [videoGameGenre, setVideoGameGenre] = useState([])

    const dispatch = useDispatch()
    const history = useHistory()
    const myState = useSelector(state => state.videoGamesGenres)

    useEffect(() => {
        dispatch(getVideoGamesGenres())
    }, [dispatch])


    //Handlers
    const handleOnChange = (e) => {
        setVideoGameData({
            ...videoGameData,
            [e.target.name]: e.target.value
        })
    }

    const handleGenre = (e) => {
        setVideoGameGenre(
            [...videoGameGenre,
            e.target.value]
        )
    }

    const handlePlatform = (e) => {
        setVideoGameData({
            ...videoGameData,
            platform: [...videoGameData.platform, e.target.value]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(videoGameData, videoGameGenre)
        const aux = await axios.post('http://localhost:3001/videogame', { videoGameData: videoGameData, videoGameGenre: videoGameGenre })
        alert(aux.data)
        history.push('/home')
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input name="name" value={videoGameData.name} onChange={handleOnChange} />

                <label>Descripcion</label>
                <textarea name="description" value={videoGameData.description} onChange={handleOnChange} />

                <label>Fecha de lanzamiento</label>
                <input type='date' name='released' value={videoGameData.released} onChange={handleOnChange} />

                <label>Rating</label>
                <select name='rating' onChange={handleOnChange}>
                    <option value=''>  </option>
                    <option value='1'> 1 </option>
                    <option value='2'> 2 </option>
                    <option value='3'> 3 </option>
                    <option value='4'> 4 </option>
                    <option value='5'> 5 </option>
                </select>

                <label>Plataforma</label>
                <select name='platform' onChange={handlePlatform}>
                    <option value=''>  </option>
                    <option value='PC'> PC </option>
                    <option value='PlayStation 3'> PlayStation 3 </option>
                    <option value='PlayStation 4'> PlayStation 4 </option>
                    <option value='PlayStation 5'> PlayStation 5 </option>
                    <option value='Xbox 360'> Xbox 360 </option>
                    <option value='Nintendo'> Nintendo </option>
                    <option value='Android'> Android </option>
                    <option value='IOs'> IOs </option>
                </select>


                <label>Genero</label>
                <select name='genres' onChange={handleGenre}>
                    <option value=''> </option>
                    {myState?.map(gen =>
                        <option key={gen.id} value={gen.id}> {gen.name} </option>
                    )}
                </select>

                <button type='submit'>Crear</button>

            </form>
        </div>
    );
}