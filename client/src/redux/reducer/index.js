import { GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_VIDEOGAMES_GENRES,GET_VIDEOGAMES_PLATFORM } from "../actions"

const initialState= {
    videoGames: [],
    videoGameDetail: [],
    videoGamesGenres: [],
    videoGamesPlatform: []
}

export default function rootReducer (state = initialState, action) {
    switch(action.type) {
        case GET_VIDEOGAMES: 
            // console.log(action.payload)
            return {
                ...state,
                videoGames: action.payload
            }
        case  GET_VIDEOGAME_DETAIL:
            return {    
                ...state,
                videoGameDetail: action.payload
            }
        case GET_VIDEOGAMES_GENRES:
            // console.log(action.payload)
            return {
                ...state,
                videoGamesGenres: action.payload
            }
        case GET_VIDEOGAMES_PLATFORM:
            return {
                ...state,
                videoGamesPlatform: action.payload
            }
        default:
            return state
    }
} 