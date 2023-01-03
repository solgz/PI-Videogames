const { Router } = require('express');
const {Genres, Videogame} = require("../db.js");
const { getApiInfo, getDbInfo, getAllVideogames, getVideogameById, getPlatforms } = require("../Controllers/VideogamesCont");

const router = Router();

router.get('/', async (req, res) => {
    const {name} = req.query;
    let videogamesTotal = await getAllVideogames();
    if (name) {
        try{
            let videogameName = await videogamesTotal.filter((vg) => vg.name.toLowerCase().includes(name.toLowerCase()));
            videogameName.length ? res.status(200).send(videogameName) : res.status(400).send(`Videogame ${name} does not exist`);

        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(200).send(videogamesTotal);
    }
})

router.post('/create', async (req, res) => {
    const { name, image, genres, released, rating, platforms, description } = req.body;
    if (!name || !platforms || !description )
       return res.status(400).json({ message: "No se brindaron los datos necesarios"});
    
    try {
        let newVideogame = await Videogame.create({
            ...req.body,
        })
        const relation = await Genres.findAll({ 
            where: {name: genres} 
        });
        newVideogame.addGenres(relation); 
        res.status(200).json(newVideogame)

    } catch (error) {
            console.log(error);
        }
})


router.get('/platforms', getPlatforms )
router.get('/:id', getVideogameById )


module.exports = router;