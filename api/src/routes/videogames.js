const express = require('express');
const router = express.Router();
const axios = require('axios')
const { Videogame } = require('../db')

//necesito dotenv para trabajar con las claves de .env
require('dotenv').config();
const { API_KEY } = process.env

//ROUTES

//get all video games  ---> endpoint  https://api.rawg.io/api/games
router.get('/a',  async (req,res,next) => {
    try {
        const getApiGames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`) // pedido API
        const apiGames = getApiGames.data.results.map(videogame => {
            return {
                id: videogame.id,
                name: videogame.name,
                img: videogame.background_image,
                genre: videogame.genres
            }
        }) 
        
        const dataBaseGames = await Videogame.findAll() // pedido db
        if(dataBaseGames.length < 1) {
            res.send(apiGames)
        } else{
            const allGames = [           // array con todos los juegos traidos de la API y la DB
                ...apiGames,
                ...dataBaseGames
            ]
            res.send(allGames);
        }

    } catch (err) {
        next(err)
    }
});


// get games by name (query) ---> endpoint  https://api.rawg.io/api/games?search={game}
router.get('/', async (req, res, next) => {
    const name = req.query.name;
        try {
            if(name){
                const getApiGamesByName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
                const apiGamesByName = getApiGamesByName.data.results.map(videogame => {
                    return {
                        id: videogame.id,
                        name: videogame.name,
                        img: videogame.background_image,
                        genre: videogame.genres
                    }})
                if(apiGamesByName.length < 1){
                    res.send('No games found.')
                } else{
                    res.json(apiGamesByName.slice(0,15))   // me traigo los primeros 15 juegos del array 
                }
            } else {
                res.send('No games found.')
            }
        } catch (err) {
            next(err);
        }
})

module.exports = router; 