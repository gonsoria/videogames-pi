const express = require('express');
const { Op } = require("sequelize");
const router = express.Router();
const axios = require('axios')
const { Videogame, Genre } = require('../db');
require('dotenv').config();
const { API_KEY } = process.env

/*
ENDPOINTS
    https://api.rawg.io/api/games?search={game}
    https://api.rawg.io/api/games
 
*/

router.get('/', async (req, res, next) => {
    const name = req.query.name;
    // pedido db
    const dataBaseGames = await Videogame.findAll({
        attributes: ['id','name', 'img'],
        include: [{model: Genre}]
    }) 
    if(name) {
        const getApiGamesByName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        const apiGamesByName = getApiGamesByName.data.results.map(videogame => {
            return {
                id: videogame.id,
                name: videogame.name,
                img: videogame.background_image,
                genres: videogame.genres.map(genre => genre.name)
            }})

        const getDBGameByName = await Videogame.findAll({
            attributes:['id','name','img'],
            include: [{model: Genre}],
            where: {
                name:{ [Op.iLike]:`%${name}%` }  
            }
        })

        if(getDBGameByName.length < 1 && apiGamesByName.length < 1 ) {
            res.send('No games found')
        } else {
            const searchResult = [
                ...getDBGameByName,
                ...apiGamesByName
            ] 
            res.send(searchResult.slice(0,15))
        }

    } else {
        //pedido api
        Promise.all([
            axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`),
            axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
            axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
            axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
            axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)                
        ])
            .then((response) => {
                let getApiGames = [];
                for (let i = 0; i < response.length; i++) {
                    getApiGames = [...getApiGames, ...response[i].data.results]
                }                
                const apiGames = getApiGames.map(videogame => {
                    return {
                        id: videogame.id,
                        name: videogame.name,
                        img: videogame.background_image,
                        genres: videogame.genres.map(genre => genre.name)
                    };
                }); 
    
                const allGames = [      // array con todos los juegos traidos de la API y la DB
                    ...dataBaseGames,
                    ...apiGames
                ]
                //console.log(apiGames.length)
                res.send(allGames)
            }).catch(next)

    }


});


module.exports = router; 