const moviesDAL = require('../DALs/moviesApiDAL')

const getAllMovies = async function()
{
    let allMoviesData = await moviesDAL.getMovies()
    let allMovies = allMoviesData.data
    return allMovies
}

const getMovieById = async function(id)
{
    let movieData = await moviesDAL.getMovieById(id)
    let movie = movieData.data
    return movie
}

const addMovie = async function(movieObj)
{
    let res = await moviesDAL.addMovie(movieObj)
    return res.data
}

const updateMovie = async function(id, movieObj)
{
    let res = await moviesDAL.updateMovie(id, movieObj)
    return res.data
}

const deleteMovie = async function(id)
{
    let res = await moviesDAL.deleteMovie(id)
    return res.data
}

module.exports = {getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie}