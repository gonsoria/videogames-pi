const express = require('express');
const router = express.Router();
const { Genre } = require('../db')

/*
ENDPOINT
     https://api.rawg.io/api/genres
     ---> Busqueda en base de datos
*/

router.get('/',  async (req,res, next) => {
    try {
        const genres = await Genre.findAll({attributes: ['name','id']})
        if(genres) {
            res.send(genres)
        }
    } catch (err) {
        next(err)
    }
})


module.exports = router;