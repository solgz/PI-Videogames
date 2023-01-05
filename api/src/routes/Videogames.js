const { Router } = require('express');
const { getAllVideogames, getVideogameById, getPlatforms, createGame } = require("../Controllers/VideogamesCont");

const router = Router();

router.get('/', async (req, res) => {
    const {name} = req.query;
    let videogamesTotal = await getAllVideogames();
    if (name) {
        try{
            let videogameName = await videogamesTotal.filter((vg) => vg.name.toLowerCase().includes(name.toLowerCase()));
            videogameName.length ? res.status(200).send(videogameName) : res.status(400).send(`Videogame ${name} does not exist`);
        } catch (error){
            res.status(404).send({error: error.message})
        }
    } else {
        res.status(200).send(videogamesTotal);
    }
})

router.post('/create', createGame)
router.get('/platforms', getPlatforms )
router.get('/:id', getVideogameById )


module.exports = router;