import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getVideoGamesGenres } from '../redux/actions'
import image from '../assets/default-img.png'


export default function Form() {
    const formValues = {
        name: '',
        description: '',
        platform: [],
        released: '',
        rating: '',
        img: image,
        created: true,
        letras: []
    }

    //Estados
    const [videoGameData, setVideoGameData] = useState(formValues)
    const [videoGameGenre, setVideoGameGenre] = useState([])
    const [error, setError] = useState(null)

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (videoGameData.name.trim() === '') {
            setError('Video game name is required!')
            return;
        }
        if (videoGameData.description.trim() === '') {
            setError('Video game description is required!')
            return;
        }
        if (videoGameData.released === '') {
            setError('Video game released date is required!')
            return;
        }
        if (videoGameData.rating === '') {
            setError('Video game rating is required!')
            return;
        }
        if (videoGameData.platform.length < 1) {
            setError('At least one Video game platform is required!')
            return;
        }
        if (videoGameGenre.length < 1) {
            setError('At least one Video game genre is required!')
            return;
        } else {
            setError(null)
            // console.log(videoGameData, videoGameGenre)
            const aux = await axios.post('http://localhost:3001/videogame', { videoGameData: videoGameData, videoGameGenre: videoGameGenre })
            alert(aux.data)
            history.push('/app/home')
        }
    }

    const handlePlatformCheckBox = (e) => {
        let check = [...videoGameData.platform, e.target.value]
        if (videoGameData.platform.includes(e.target.value)) {
            check = check.filter(a => a !== e.target.value)
        }
        setVideoGameData({
            ...videoGameData,
            platform: check
        })
    }

    const handleGenresCheckBox = (e) => {
        let check = [...videoGameGenre, e.target.value]
        if (videoGameGenre.includes(e.target.value)) {
            check = check.filter(a => a !== e.target.value)
        }
        setVideoGameGenre(check)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h4>Game name</h4>
                <input name="name" value={videoGameData.name} onChange={handleOnChange} />

                <h4>Description</h4>
                <textarea name="description" value={videoGameData.description} onChange={handleOnChange} />

                <h4>Released date</h4>
                <input type='date' name='released' value={videoGameData.released} onChange={handleOnChange} />

                <h4>Rating</h4>
                <select name='rating' onChange={handleOnChange}>
                    <option value=''>  </option>
                    <option value='1'> 1 </option>
                    <option value='2'> 2 </option>
                    <option value='3'> 3 </option>
                    <option value='4'> 4 </option>
                    <option value='5'> 5 </option>
                </select>

                <div>
                    <h4>Platforms</h4>
                    <label>PC</label>
                    <input type='checkbox' value='PC' onChange={handlePlatformCheckBox} />
                    <label>PlayStation 3</label>
                    <input type='checkbox' value='PlayStation 3' onChange={handlePlatformCheckBox} />
                    <label>PlayStation 4</label>
                    <input type='checkbox' value='PlayStation 4' onChange={handlePlatformCheckBox} />
                    <label>PlayStation 5</label>
                    <input type='checkbox' value='PlayStation 5' onChange={handlePlatformCheckBox} />
                    <label>XBox 360</label>
                    <input type='checkbox' value='XBox 360' onChange={handlePlatformCheckBox} />
                    <label>Nintendo</label>
                    <input type='checkbox' value='Nintendo' onChange={handlePlatformCheckBox} />
                    <label>Android</label>
                    <input type='checkbox' value='Android' onChange={handlePlatformCheckBox} />
                    <label>IOs</label>
                    <input type='checkbox' value='IOs' onChange={handlePlatformCheckBox} />
                </div>

                <div>
                    <h4>Genres</h4>
                    {myState?.map(gen =>
                        <div key={gen.id}>
                            <label>{gen.name}</label>
                            <input type='checkbox' value={gen.id} onChange={handleGenresCheckBox} />
                        </div>
                    )}
                </div>



                <button type='submit'>CREATE GAME</button>
            </form>
            {
                error ? (<div>{error}</div>) : null
            }
        </div>
    );
}