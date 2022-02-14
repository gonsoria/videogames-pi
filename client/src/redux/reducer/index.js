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
     FILTER_BY_TYPE,
     FILTER_TYPE_STATUS,
     GET_FILTERED_GAMES,
     SET_LOADER,
     SET_ERROR
} from "../actions"

const initialState= {
    videoGames: [],
    videoGameDetail: [],
    videoGamesGenres: [],
    allGames:[],
    filteredVideoGames: [],
    userVideoGames: [],
    typeStatus: false,
    loader: true,
    error500: false
}

export default function rootReducer (state = initialState, action) {
    switch(action.type) {
        case GET_VIDEOGAMES: 
            return {
                ...state,
                videoGames: action.payload,
                allGames: action.payload,
                userVideoGames: action.payload.filter(uvg => uvg.created === true),
                loader:false,
            }
        case  GET_VIDEOGAME_DETAIL:
            if(action.payload){
                return {    
                    ...state,
                    loader:false,
                    videoGameDetail: action.payload
                }
            } else {
                return{
                    ...state,
                    error500: true
                }
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
            let genreFilter = state.allGames.filter(vg => vg.genres.includes(action.payload) === true)
            let genreUserFilter = state.userVideoGames.filter(vg => vg.genres.includes(action.payload) === true)
            if(state.typeStatus === false){
                return {
                    ...state,
                    videoGames: genreFilter,
                    filteredVideoGames: genreFilter
                }        
            } else {
                return {
                    ...state,
                    videoGames: genreUserFilter,
                    filteredVideoGames: genreFilter
                }        
            }
            
        case FILTER_BY_TYPE:

            if(state.filteredVideoGames.length < 1) {
                let typeFilter = state.allGames.filter(tg => tg.created.toString() === action.payload)
                console.log(typeFilter)
                return {
                    ...state,
                    videoGames: typeFilter,
                }               
            } else {
                let typeFilter = state.filteredVideoGames.filter(tg => tg.created.toString() === action.payload)
                console.log(typeFilter)
                return {
                    ...state,
                    videoGames: typeFilter,
                }               
            }
        case FILTER_TYPE_STATUS:
            return {
                ...state,
                typeStatus: action.payload
            }
        case GET_FILTERED_GAMES:
            console.log(state.filteredVideoGames)
            return {
                ...state,
                videoGames: state.filteredVideoGames
            }
        case SET_LOADER:
            return{
                ...state,
                loader: action.payload
            }
        case SET_ERROR:
            return{
                ...state,
                error500: action.payload
            }
        default:
            return state
    }
} 