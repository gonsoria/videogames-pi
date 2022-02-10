const axios = require('axios');
const express = require('express');
const router = express.Router();
const { Videogame, Genre } = require('../db')
require('dotenv').config();
const { API_KEY } = process.env

/*
ENDPOINT
    https://api.rawg.io/api/games/{id} 
*/

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        if(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
            const idSearch = await Videogame.findByPk(id, {
                include: [{
                    model: Genre,
                    attributes:['name'],
                    through:{attributes:[]}
                 }]
            })

            const formatIdSearch = {
                id: idSearch.id,
                name: idSearch.name,
                img: idSearch.img,
                genres: idSearch.genres.map(genre => genre.name),
                description: idSearch.description,
                released: idSearch.released,
                rating: idSearch.rating,
                platform: idSearch.platform,
                created: idSearch.created
            }

            // console.log('es uuid')
            if(!idSearch) {
                res.send('Game data not found')
            } else {
                res.send(formatIdSearch)
            }
        } else {
            const videoGameById = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
                const videoGameData = videoGameById.data
                const videoGameDetail = {
                    id: videoGameData.id,
                    name: videoGameData.name,
                    img: videoGameData.background_image,
                    genres: videoGameData.genres.map(genre => genre.name),
                    description: videoGameData.description_raw,
                    released: videoGameData.released,
                    rating: videoGameData.rating,
                    platform: videoGameData.platforms.map(elem => elem.platform.name)
                }
                res.send(videoGameDetail)            
            }        
    } catch (err) {
        next(err)
    }
})

//create videogame

router.post('/', async (req, res, next) => {
    const {videoGameData, videoGameGenre } = req.body
    console.log(videoGameData,videoGameGenre)
    if(videoGameData && videoGameGenre){
        try {
            const newVideogame = await Videogame.create(videoGameData) 
            videoGameGenre.forEach(async gen => {
                let dbSearch = await Genre.findAll({where: {id: gen}})
                if(dbSearch) { 
                    newVideogame.addGenre(dbSearch)
                }
            }) 
            res.send('Video game created')      
        } catch (err) {
            next(err)
        }
    } else {
        res.send('Incomplete data.')
    }
})

module.exports = router;


// {
//     "videogameData":{ 
//         "name":"gonzalo",
//         "description":"! un juego",
//         "img":"imagen",
//         "rating": "5",
//         "platform":["una", "otra"]
//     },
//     "videogameGenre":{
//         "genres":[]
//     }
    
// }