let movies = require('../Models/moviesModel')
const moviesDAL = require('../DALs/moviesDAL');

const getMoviesFromWSToDB = async function()
{
    console.log("getMoviesFromWSToDB")
    let resp = await moviesDAL.getMovies()
    let allMoviesArr = resp.data

    allMoviesArr.forEach(movie =>
    {
        let movieObj = {name : movie.name, genres : movie.genres, image : movie.image.medium, premiered : movie.premiered}
        let res = addMovie(movieObj)
        if(res == 'OK')
        {
            return 'OK'
        }
        else
        {
            return 'FALIURE'
        }
    }) 
}

const getAllMovies = function()
{
    return new Promise((resolve, reject) =>
    {
        movies.find({}, function(err,result)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(result)
            }
        })
    })
}

const getMovieById = function(id)
{
    return new Promise((resolve, reject) =>
    {
        movies.findById(id,function(err,movie)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(movie)
            }
        })
    })
}

const addMovie = function(mov)
{
    return new Promise((resolve, reject) =>
    {
        const s = new movies({
            name : mov.name,
            genres : mov.genres,
            image : mov.image,
            premiered : mov.premiered
        })
        s.save(function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(s._id);
            }
        })
    })
}

const updateMovie = function(id, obj)
{
    return new Promise((resolve, reject) =>
    {
        movies.findByIdAndUpdate(id, obj, function(err)
          {
              if(err)
              {
                  reject(err)
              }
              else
              {
                  resolve('OK')
              }
          }
        )
    })
}

const deleteMovie = function(id)
{
    return new Promise((resolve, reject) =>
    {
        movies.findByIdAndDelete(id, function(err)
          {
              if(err)
              {
                  reject(err)
              }
              else
              {
                  resolve('OK')
              }
          }
        )
    })
}

module.exports = {getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie, getMoviesFromWSToDB}