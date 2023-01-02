const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const {Genres} = require("../db.js");

const getGenres = async (req, res) => {
    try {
        const requestToApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const genresApi = requestToApi.data.results.map((genre) => genre.name)
        
        genresApi.map((genre) => {
            Genres.findOrCreate({
                where: {name: genre}
            })
        })

        const allGenres = await Genres.findAll();
        res.json(allGenres); 

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getGenres
}