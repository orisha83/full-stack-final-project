const express = require('express');
const router = express.Router();
const subscriptionsBL = require('../BL/subscriptionsBL')

router.route('/')
    .get( async function(req,resp)
    {
        let allSubscriptions = await subscriptionsBL.getAllSubscriptions()
        return resp.json(allSubscriptions);
    })

router.route('/:id')
    .get( async function(req,resp)
    {
        let subscription = await subscriptionsBL.getSubscriptionById(req.params.id)
        return resp.json(subscription);
    })

router.route('')
    .post(async function(req,resp)
    {
        let obj = req.body;
        let res = await subscriptionsBL.addSubscription(obj)
        return resp.json(res);
    })

router.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
        let res = await subscriptionsBL.updateSubscription(id,obj)
        return resp.json(res);
    })

router.route('/:id')
    .delete(async function(req,resp)
    {
        let id = req.params.id;
        let res = await subscriptionsBL.deleteSubscription(id)
        return resp.json(res);
    })

    module.exports = router;
