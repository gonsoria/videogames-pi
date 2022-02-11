import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL'
export const GET_VIDEOGAMES_GENRES = 'GET_VIDEOGAMES_GENRES'
export const SEARCH_VIDEOGAME = 'SEARCH_VIDEOGAME'
export const GET_VIDEOGAMES_PLATFORM= 'GET_VIDEOGAMES_PLATFORM'
export const SORT_ASC = 'SORT_ASC'
export const SORT_DESC = 'SORT_DESC'
export const SORT_RATING_DESC = 'SORT_RATING_DESC'
export const SORT_RATING_ASC = 'SORT_RATING_ASC'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE'
export const FILTER_TYPE_STATUS = 'FILTER_TYPE_STATUS'
export const GET_FILTERED_GAMES = 'GET_FILTERED_GAMES'

const URL_GET_VIDEOGAMES = 'http://localhost:3001/videogames'
const URL_GET_GENRES = 'http://localhost:3001/genres'
const URL_VIDEOGAME_DETAIL = 'http://localhost:3001/videogame/'
const URL_SEARCH_VIDEOGAME = 'http://localhost:3001/videogames?name='

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


export const searchVideoGame = (searchName) => {
    return async function(dispatch){
        try {
            let req = await axios.get(URL_SEARCH_VIDEOGAME + searchName)
            dispatch({
                type: SEARCH_VIDEOGAME,
                payload: req.data
            })            
        } catch (err) {
            console.log(err)
        }
    }
}

export const sortVideoGamesAsc = () => {
    return{
        type:SORT_ASC,
        payload:null
    }

}
export const sortVideoGamesDesc = () => {
    return{
        type:SORT_DESC,
        payload:null
    }
}
export const sortRatingAsc = () => {
    return{
        type:SORT_RATING_ASC,
        payload:null
    }
}
export const sortRatingDesc = () => {
    return{
        type:SORT_RATING_DESC,
        payload:null
    }
}

export const filterByGenre = (name) => {
    return {
        type: FILTER_BY_GENRE,
        payload: name
    }
}

export const getFilteredGames = () => {
    return {
        type: GET_FILTERED_GAMES,
        payload: null
    }
}

export const filterByType = (created) => {
    return {
        type: FILTER_BY_TYPE,
        payload: created
    }
}

export const filterTypeStatus = (active) => {
    return {
        type: FILTER_TYPE_STATUS,
        payload: active
    }
}