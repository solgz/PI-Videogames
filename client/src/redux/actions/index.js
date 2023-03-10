import axios from 'axios';

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const SEARCH_GAME = "SEARCH_GAME";
export const GAME_DETAIL = "GAME_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const SORT = "SORT";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const RESTORE_GAMES = "RESTORE_GAMES";
export const ADD_GAME = "ADD_GAME";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const CLEAN_DETAIL ="CLEAN_DETAIL";
export const CLEAN_VIDEOGAMES = "CLEAN_VIDEOGAMES";

export function getVideogames(){ 
    return async function(dispatch){
        try {
            let apiRequest = await axios.get("http://localhost:3001/videogames");
            return dispatch({
                type: 'GET_VIDEOGAMES',
                payload: apiRequest.data
            })
        } catch (error) {
            return error;
        }
    }
}

export function searchGame(name) {
    return async function(dispatch){
        try{
            let apiRequest = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: 'SEARCH_GAME',
                payload: apiRequest.data 
            })
        } catch(error) {
            return error;
        }
    }
}

export function gameDetail(id) {
    return async function(dispatch){
        try {
            let apiRequest = await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch({
                type: 'GAME_DETAIL',
                payload: apiRequest.data
            })
        } catch(error) {
            return error;
        }
    }
}

export function addGame(newGame) {
    return async function() {
        try{
            let createdGame = await axios.post("http://localhost:3001/videogames/create", newGame);
            return createdGame;
        } catch(error) {
            return error;
        }
    }
}

export function getGenres(){
    return async function(dispatch){
        let apiRequest = await axios.get("http://localhost:3001/genres");
        return dispatch({
            type: 'GET_GENRES',
            payload: apiRequest.data
        })
    }
}

export function getPlatforms(){
    return async function(dispatch){
        let apiRequest = await axios.get("http://localhost:3001/videogames/platforms");
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: apiRequest.data
        })
    }
}


export function filterVideogamesByGenre(genre){
    return {
        type: 'FILTER_BY_GENRE',
        payload: genre
    }
}

export function filterByOrigin(origin) {
    return {
        type: 'FILTER_BY_ORIGIN',
        payload: origin
    }
}

export function sort(sort) {
    return {
        type: 'SORT',
        payload: sort
    }
}

export function restoreGames() {
    return {
        type: 'RESTORE_GAMES'
    }
}

export function cleanDetail() {
    return {
        type: 'CLEAN_DETAIL',
    }

}

export function cleanVideogames() {
    return {
        type: 'CLEAN_VIDEOGAMES'
    }
}


