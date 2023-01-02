const { Router } = require('express');
// Importar todos los routers;
const videogamesRoutes = require('./Videogames.js');
const genresRoutes = require('./Genres.js');
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogamesRoutes);
router.use('/genres', genresRoutes);

module.exports = router;
