let axios = require('axios')

const getMovies = function()
{
    return axios.get("http://localhost:8000/api/movies");
}

const getMovieById = function(id)
{
    return axios.get("http://localhost:8000/api/movies/" + id);
}

const addMovie = function(movieObj)
{
    return axios.post("http://localhost:8000/api/movies", movieObj)
}

const updateMovie = function(id, movieObj)
{
    return axios.put("http://localhost:8000/api/movies/" + id, movieObj)
}

const deleteMovie = function(id)
{
    return axios.delete("http://localhost:8000/api/movies/" + id)
}

module.exports  =  {getMovies, getMovieById, addMovie, updateMovie, deleteMovie}