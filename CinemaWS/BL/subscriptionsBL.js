const subscriptionsDAL = require('../DALs/subscriptionsApiDAL')

const getAllSubscriptions = async function()
{
    let allSubscriptionsData = await subscriptionsDAL.getSubscriptions()
    let allSubscriptions = allSubscriptionsData.data
    return allSubscriptions
}

const getSubscriptionById = async function(id)
{
    let subscriptionsData = await subscriptionsDAL.getSubscriptionById(id)
    let subscription = subscriptionsData.data
    return subscription
}

const addSubscription = async function(movieObj)
{
    let res = await subscriptionsDAL.addSubscription(movieObj)
    return res.data
}

const updateSubscription = async function(id, movieObj)
{
    let res = await subscriptionsDAL.updateSubscription(id, movieObj)
    return res.data
}

const deleteSubscription = async function(id)
{
    let res = await subscriptionsDAL.deleteSubscription(id)
    return res.data
}

module.exports = {getAllSubscriptions, getSubscriptionById, addSubscription, updateSubscription, deleteSubscription}