import {
     GET_VIDEOGAMES,
     GET_VIDEOGAME_DETAIL, 
     GET_VIDEOGAMES_GENRES,
     SEARCH_VIDEOGAME,
     SORT_ASC, 
     SORT_DESC,
     SORT_RATING_DESC,
     SORT_RATING_ASC,
     FILTER_BY_GENRE,
     FILTER_BY_TYPE
} from "../actions"

const initialState= {
    videoGames: [],
    videoGameDetail: [],
    videoGamesGenres: [],
    // sortVideoGames:[]
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
        case SEARCH_VIDEOGAME:
            return {
                ...state,
                videoGames: action.payload
            }
        case SORT_ASC:
            return{
                ...state,
                videoGames: state.videoGames.sort((a,b) => {
                    if(a.name.toLowerCase() < b.name.toLowerCase()){
                        return -1
                    } else if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return 1
                    } else {
                        return 0
                    }
                })
            }
        case SORT_DESC:
            return{
                ...state,
                videoGames: state.videoGames.sort((a,b) => {
                    if(a.name.toLowerCase() < b.name.toLowerCase()){
                        return 1
                    } else if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1
                    } else {
                        return 0
                    }
                })
            }
        case SORT_RATING_ASC:
            return {
                ...state,
                videoGames: state.videoGames.sort((a,b) =>{
                    if(a.rating < b.rating){
                        return -1
                    } else if(a.rating > b.rating) {
                        return 1
                    } else {
                        return 0
                    }
                }
                )
            }
        case SORT_RATING_DESC:
            return {
                ...state,
                videoGames: state.videoGames.sort((a,b) =>{
                    if(a.rating < b.rating){
                        return 1
                    } else if(a.rating > b.rating) {
                        return -1
                    } else {
                        return 0
                    }
                }
                )
            }
        case FILTER_BY_GENRE:
            console.log(action.payload)
            let genreFilter = state.videoGames.filter(vg => 
                vg.genres.includes(action.payload) === true
                )
            console.log(genreFilter)
            return {
                ...state,
                videoGames: genreFilter
            }        
            
        case FILTER_BY_TYPE:
            let typeFilter = state.videoGames.filter(tg => tg.created.toString() === action.payload)
            console.log(typeFilter)
            return {
                ...state,
                videoGames: typeFilter 
            }
        default:
            return state
    }
} 