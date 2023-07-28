const router = require('express').Router();
const {
  validateMovies,
  validateMovieId,
} = require('../middlewares/validations');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', validateMovies, createMovie);

router.delete('/movies/:movieId', validateMovieId, deleteMovie);

module.exports = router;
