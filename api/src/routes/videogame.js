const axios = require('axios');
const express = require('express');
const router = express.Router();
const { Videogame, Genre } = require('../db')

require('dotenv').config();
const { API_KEY } = process.env

//https://api.rawg.io/api/games/{id}
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        if(id) {
            const videoGameById = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            const videoGameData = videoGameById.data
            const videoGameDetail = {
                id: videoGameData.id,
                name: videoGameData.name,
                img: videoGameData.background_image,
                genre: videoGameData.genres.map(genre => genre.name),
                description: videoGameData.description,
                released: videoGameData.released,
                rating: videoGameData.rating,
                platform: videoGameData.platforms.map(elem => elem.platform.name)
            }
            res.send(videoGameDetail)
        } else {
            res.send('Game not found')
        }
    } catch (err) {
        next(err)
    }
})


router.post('/', async (req, res, next) => {
    const {
        name,
        description,
        released,
        rating,
        platform
    } = req.body
    try {
        const videogame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platform
        })  
        res.send('Video game created')      
    } catch (err) {
        next(err)
    }
})


module.exports = router;