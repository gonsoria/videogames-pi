const express = require('express');
const router = express.Router();
const axios = require('axios')
const { Op } = require("sequelize");
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env

/*
ENDPOINTS
    https://api.rawg.io/api/games?search={game}
    https://api.rawg.io/api/games 

*/

router.get('/', async (req, res, next) => {
    const name = req.query.name;

    // pedido db
    const getDBGames = await Videogame.findAll({
        attributes: ['id','name', 'img','created'],
        include: [{
            model: Genre,
            attributes:['name'],
            through:{attributes:[]}
        }]
    })
    
    const dataBaseGames = getDBGames.map(dbGames => {
        return {
            id:dbGames.id, 
            name:dbGames.name,
            img:dbGames.img,
            genres:dbGames.genres.map(ge=>ge.name),
            created:dbGames.created
        }
    })

    if(name) {
        const getApiGamesByName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        const apiGamesByName = getApiGamesByName.data.results.map(videogame => {
            return {
                id: videogame.id,
                name: videogame.name,
                img: videogame.background_image,
                genres: videogame.genres.map(genre => genre.name),
            }})

        const getDBGameByName = await Videogame.findAll({
            attributes:['id','name','img'],
            where: {
                name:{ [Op.iLike]:`%${name}%` }  
            }
        })

        console.log(getDBGameByName)

        if(getDBGameByName.length < 1 && apiGamesByName.length < 1 ) {
            res.send('No games found')
        } else {
            const searchResult = [
                ...getDBGameByName,
                ...apiGamesByName
            ] 
            res.send(searchResult)
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
                // console.log(response)
                let getApiGames = [];
                for (let i = 0; i < response.length; i++) {
                    getApiGames = [...getApiGames, ...response[i].data.results]
                }                
                const apiGames = getApiGames.map(videogame => {
                    return {
                        id: videogame.id,
                        name: videogame.name,
                        img: videogame.background_image,
                        rating: videogame.rating,
                        genres: videogame.genres.map(genre => genre.name),
                        created: false
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