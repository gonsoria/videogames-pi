import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getVideoGamesGenres } from '../redux/actions'
import image from '../assets/default-img.png'
import styles from './styles/Form.module.css'

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

    const platforms = ['PC', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5', 'XBox 360', 'Nintendo', 'Android', 'IOs']

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
        if (videoGameData.description.length.toString() < 15) {
            setError('Description must have at least 15 characters.')
            return;
        }
        if (videoGameData.released === '') {
            setError('Video game released date is required!')
            return;
        }
        if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(videoGameData.released)) {
            setError('Invalid date format (must follows aaaa-mm-dd)')
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

    const handleImg = (e) => {
        setVideoGameData({
            ...videoGameData,
            img: document.getElementById('img').value
        })
    }



    return (
        <div>
            <div className={styles.form_bkg}></div>
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <h2 className={styles.form_title}>Post your Video Game</h2>

                <h4>Game name:<span> *</span></h4>
                <input className={styles.input_text} name="name" value={videoGameData.name} onChange={handleOnChange} />

                <h4>Image URL:</h4>
                <div className={styles.url_container}>
                    <input className={styles.url_text} type="text" name='img' id='img' />
                    <button className={styles.img_button} onClick={handleImg}>▲</button>
                </div>
                <img className={styles.img} src={videoGameData.img} alt="user videogame img" />


                <h4>Description:<span> *</span></h4>
                <textarea name="description" value={videoGameData.description} onChange={handleOnChange} />

                <h4>Released date:<span> *</span></h4>
                <input className={styles.released} type='date' name='released' value={videoGameData.released} onChange={handleOnChange} />
                <h4>Rating:<span> *</span></h4>
                <select name='rating' onChange={handleOnChange}>
                    <option value=''>  </option>
                    <option value='1'> 1 </option>
                    <option value='2'> 2 </option>
                    <option value='3'> 3 </option>
                    <option value='4'> 4 </option>
                    <option value='5'> 5 </option>
                </select>
                <h4>Platforms: <span> *</span></h4>
                <div className={styles.form_platforms}>
                    {platforms.map((plat, index) =>
                        <div key={index}>
                            <label>{plat}</label>
                            <input type='checkbox' value={plat} onChange={handlePlatformCheckBox} />
                        </div>
                    )}
                </div>
                <h4>Genres:<span> *</span></h4>
                <div className={styles.form_genres}>
                    {myState?.map(gen =>
                        <div key={gen.id}>
                            <label>{gen.name}</label>
                            <input type='checkbox' value={gen.id} onChange={handleGenresCheckBox} />
                        </div>
                    )}
                </div>
                {
                    error ? (<div className={styles.error}>*{error}</div>) : null
                }
                <button className={styles.submit_button} type='submit' >CREATE GAME</button>
            </form>
        </div>
    );
}