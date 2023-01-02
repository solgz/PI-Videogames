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

export function getVideogames(){ //para manejo de errores usar try catch y hacer que me muestre los errores que tira el back
    return async function(dispatch){
        let apiRequest = await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: apiRequest.data
        })
    }
}

export function searchGame(name) {
    return async function(dispatch){
        let apiRequest = await axios.get(`http://localhost:3001/videogames?name=${name}`);
        return dispatch({
            type: 'SEARCH_GAME',
            payload: apiRequest.data 
        })
    }
}

export function gameDetail(id) {
    return async function(dispatch){
        let apiRequest = await axios.get(`http://localhost:3001/videogames/${id}`);
        return dispatch({
            type: 'GAME_DETAIL',
            payload: apiRequest.data
        })
    }
}

export function addGame(newGame) {
    return async function() {
        let createdGame = await axios.post("http://localhost:3001/videogames/create", newGame);
        return createdGame;
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

