const { Videogame, Genres } = require("../db.js");
const axios = require('axios');
require('dotenv').config();

const {API_KEY} = process.env;

const getApiInfo = async () => {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
    let videogames = [];
    
    try {
        for (let i = 0; i < 5; i++) {
            const requestToApi = await axios.get(url);

            requestToApi.data.results.map(game => {
                videogames.push(
                    {
                        id: game.id,
                        name: game.name,
                        image: game.background_image,
                        release: game.released,
                        rating: game.rating,
                        platforms: game.platforms?.map((el) => el.platform.name), 
                        genres: game.genres?.map((el) => el.name), 
                    });
            });
            url = requestToApi.data.next;
        }
        return videogames;

    } catch (error) {
        console.log(error);
    }
}

const getDbInfo = async() => {
    try {
        let dbVideogames;
		dbVideogames = await Videogame.findAll({
			include: [
				{
					model: Genres,
					atributes: ["name"],
					through: {
						attributes: [],
					},
				},
			],
		});
        dbVideogames = dbVideogames.map((game) => game.dataValues);
        dbVideogames = dbVideogames.map((game) => {
            let vgGenres = game.Genres.map((gen) => gen.name);
            return dbVideogames = {
                ...game,
                genres: vgGenres
            }
        })
        return dbVideogames;
	} catch (e) {
		console.error(e);
	}
}
 
const getAllVideogames = async () => { 
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

const getVideogameById = async (req, res) => {
    const { id } = req.params;
    let videogame;

    if (isNaN(id)) {
      videogame = await Videogame.findByPk(id, {
        include: [ 
            {
                model: Genres,
                atributes: ["name"],
                throught: {
                    attributes: [],
                },
            },
        ],
    });
    } else {
      videogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      videogame = videogame.data;
      let mappedPlatforms = videogame.platforms.map((e) => e.platform.name)

      videogame = {
        id: videogame.id,
        name : videogame.name,
        description: videogame.description,
        released: videogame.released,
        rating: videogame.rating,
        genres: videogame.genres,
        platforms: mappedPlatforms,
        image: videogame.background_image
      }
    }
    return res.json(videogame);
  };

const getPlatforms = async (req, res) => {
    try{
        const allGames = await getApiInfo();
        const allPlatforms = [];
        allGames.map((game) => {
            game.platforms.map((plat) => {
                if(!allPlatforms.includes(plat)) allPlatforms.push(plat);
            })
        })
        allPlatforms.length ? res.status(200).json(allPlatforms) : res.status(404).send("Error");
    } catch(error){
        console.log(error);
    }
}

const createGame = async (req, res) => {
        const { name, image, genres, release, rating, platforms, description } = req.body;
        const allGames = await getDbInfo();
        const repeatedName = await allGames.filter(game => game.name.toLowerCase() === name.toLowerCase())

        if (!name || !platforms || !description ) {
            return res.status(400).send("One of the following is missing: name, description, platforms!")
        }
        
        if (repeatedName.length) {
            return res.status(404).send("There is a game with that name already!")
        }
      
        try {
            let newVideogame = await Videogame.create({
                name,
                image,
                genres,
                release,
                rating,
                platforms,
                description
            })
            const relation = await Genres.findAll({ 
                where: {name: genres} 
            });
            newVideogame.addGenres(relation); 
            res.status(200).json(newVideogame)
    
        } catch (error) {
                res.send({error:error.message})
            }
    }

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllVideogames,
    getVideogameById,
    getPlatforms,
    createGame
};