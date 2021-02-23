const express = require('express')
const router = express.Router();
const moviesBL = require('../BL/moviesBL')

router.route('/')
    .get( async function(req,resp)
    {
        let allMovies = await moviesBL.getAllMovies()
        return resp.json(allMovies);
    })

router.route('/:id')
    .get( async function(req,resp)
    {
        let movie = await moviesBL.getMovieById(req.params.id)
        return resp.json(movie);
    })

router.route('')
    .post(async function(req,resp)
    {
        let obj = req.body;
        let res = await moviesBL.addMovie(obj)
        return resp.json(res);
    })

router.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
        let res = await moviesBL.updateMovie(id,obj)
        return resp.json(res);
    })

router.route('/:id')
    .delete(async function(req,resp)
    {
        let id = req.params.id;
        let res = await moviesBL.deleteMovie(id)
        return resp.json(res);
    })

    module.exports = router;

