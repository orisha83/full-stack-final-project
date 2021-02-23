let axios = require('axios')

const getSubscriptions = function()
{
    return axios.get("http://localhost:8000/api/subscriptions");
}

const getSubscriptionById = function(id)
{
    return axios.get("http://localhost:8000/api/subscriptions/" + id);
}

const addSubscription = function(movieObj)
{
    return axios.post("http://localhost:8000/api/subscriptions", movieObj)
}

const updateSubscription = function(id, movieObj)
{
    return axios.put("http://localhost:8000/api/subscriptions/" + id, movieObj)
}

const deleteSubscription = function(id)
{
    return axios.delete("http://localhost:8000/api/subscriptions/" + id)
}

module.exports  =  {getSubscriptions, getSubscriptionById, addSubscription, updateSubscription, deleteSubscription}