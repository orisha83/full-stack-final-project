const express = require('express');
const router = express.Router();
const usersBL = require('../BL/usersBL')

router.route('/')
    .get( async function(req,resp)
    {
        let allUsers = await usersBL.getAllUsers()
        return resp.json(allUsers);
    })

router.route('/:id')
    .get( async function(req,resp)
    {
        let user = await usersBL.getUserById(req.params.id)
        return resp.json(user);
    })

router.route('')
    .post(async function(req,resp)
    {
        let obj = req.body;
        let res = await usersBL.addUser(obj)
        return resp.json(res);
    })

router.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
        let res = await usersBL.updateUser(id,obj)
        return resp.json(res);
    })

router.route('/:id')
    .delete(async function(req,resp)
    {
        let id = req.params.id;
        let res = await usersBL.deleteUser(id)
        return resp.json(res);
    })

    module.exports = router;
