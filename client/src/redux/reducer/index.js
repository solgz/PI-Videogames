import {
    GET_VIDEOGAMES,
    SEARCH_GAME,
    GAME_DETAIL,
    ADD_GAME,
    GET_GENRES,
    GET_PLATFORMS,
    FILTER_BY_GENRE,
    FILTER_BY_ORIGIN,
    SORT,
    RESTORE_GAMES,
    CLEAN_DETAIL,
    CLEAN_VIDEOGAMES,

} from "../actions";

const initialState = {
    videogames: [],
    gameDetail: {},
    genres: [],
    platforms: [],
    origin: "",
    sort: "",
    genre: "",
}

function rootReducer(state = initialState, action){
    switch(action.type) {
        case GET_VIDEOGAMES:
            let array = [...action.payload];
            const sort = state.sort;
            const genre = state.genre;
            const origin = state.origin;

            if(sort === "A-Z") array.sort((a,b) => {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            })
            if(sort === "Z-A") array.sort((a,b) => {
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
            })
            if (sort === "0-5") array.sort((a,b) => {
                return a.rating > b.rating ? 1 : -1
            })
            if (sort === "5-0") array.sort((a,b) => {
                return a.rating > b.rating ? -1 : 1
            })
            if (genre) {
                array = array.filter((game) => game.genres.includes(genre));
            }
            if (origin === "Created") {
               array = array.filter((game) => typeof game.id === "string" )
            }
            if (origin === "Api") {
                array = array.filter((game) => typeof game.id === "number")
            }

            return {
                ...state,
                videogames: array
            }

        case SEARCH_GAME:
            return {
                ...state,
                videogames: action.payload

            }

        case GAME_DETAIL:
            return {
                ...state,
                gameDetail: action.payload
            }
        
        case ADD_GAME:
            return {
                ...state,
            }

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }

        case FILTER_BY_GENRE: 
            return {
            ...state,
            genre: action.payload 
            }

        case FILTER_BY_ORIGIN:
            return {
                ...state,
                origin: action.payload
            }

        case SORT:
            return {
                ...state,
                sort: action.payload
            }

        case RESTORE_GAMES:
            return {
                ...state,
                origin: "",
                order: "",
                rating: "",
                genre: "",
            }

        case CLEAN_DETAIL:
            return {
                ...state,
                gameDetail: {}
            }
        
        case CLEAN_VIDEOGAMES:
            return {
                ...state,
                videogames: []
            }

        default: return {...state};
    }
};

export default rootReducer;