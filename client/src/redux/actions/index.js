import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL'
export const GET_VIDEOGAMES_GENRES = 'GET_VIDEOGAMES_GENRES'
export const SEARCH_VIDEOGAME = 'SEARCH_VIDEOGAME'
export const GET_VIDEOGAMES_PLATFORM= 'GET_VIDEOGAMES_PLATFORM'

const URL_GET_VIDEOGAMES = 'http://localhost:3001/videogames'
const URL_GET_GENRES = 'http://localhost:3001/genres'
const URL_VIDEOGAME_DETAIL = 'http://localhost:3001/videogame/'


export const getVideoGames = () => {
    return async function (dispatch) {
        try {
            let req = await axios.get(URL_GET_VIDEOGAMES)
            dispatch({
                type: GET_VIDEOGAMES,
                payload: req.data
            })            
        } catch (error) {
            console.log('Videogame actions not founded')             
        }
    }
};

export const getVideoGameDetail = (id) => {
    return async function(dispatch) {
        try {
            let req = await axios.get(URL_VIDEOGAME_DETAIL + id)
            dispatch({
                type: GET_VIDEOGAME_DETAIL,
                payload: req.data
            })            
        } catch (error) {
            console.log('Videogame actions not founded')             
        }
    }
}

export const getVideoGamesGenres = () => {
    return async function(dispatch) {
        let req = await axios.get(URL_GET_GENRES)
        dispatch({
            type: GET_VIDEOGAMES_GENRES,
            payload: req.data
        })
    }
}


export const searchVideoGame = (id) => {
    return {
        type: SEARCH_VIDEOGAME,
        payload: id
    }
}

