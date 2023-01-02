const { Router } = require('express');
const {getGenres} = require('../Controllers/GenresCont')

const router = Router();

router.get('/', getGenres)

module.exports = router;