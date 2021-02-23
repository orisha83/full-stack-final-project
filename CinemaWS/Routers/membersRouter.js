const express = require('express')
const router = express.Router();
const membersBL = require('../BL/membersBL')

router.route('/')
    .get( async function(req,resp)
    {
        let allMembers = await membersBL.getAllMembers()
        return resp.json(allMembers);
    })

router.route('/:id')
    .get( async function(req,resp)
    {
        let member = await membersBL.getMemberById(req.params.id)
        return resp.json(member);
    })

router.route('')
    .post(async function(req,resp)
    {
        let obj = req.body;
        let res = await membersBL.addMember(obj)
        return resp.json(res);
    })

router.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
        let res = await membersBL.updateMember(id,obj)
        return resp.json(res);
    })

router.route('/:id')
    .delete(async function(req,resp)
    {
        let id = req.params.id;
        let res = await membersBL.deleteMember(id)
        return resp.json(res);
    })

    module.exports = router;

