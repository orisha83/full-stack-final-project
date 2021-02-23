let subscriptions = require('../Models/subscriptionsModel')

const getAllSubscriptions = function()
{
    return new Promise((resolve, reject) =>
    {
        subscriptions.find({}, function(err,result)
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

const getSubscriptionById = function(id)
{
    return new Promise((resolve, reject) =>
    {
        subscriptions.findById(id,function(err,subscription)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(subscription)
            }
        })
    })
}

const addSubscription = function(sub)
{
    return new Promise((resolve, reject) =>
    {
        const s = new subscriptions({
            memberId : sub.memberId,
            movies : sub.movies
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

const updateSubscription = function(id, obj)
{
    return new Promise((resolve, reject) =>
    {
        subscriptions.findByIdAndUpdate(id, obj, function(err)
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

const deleteSubscription = function(id)
{
    return new Promise((resolve, reject) =>
    {
        subscriptions.findByIdAndDelete(id, function(err)
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

module.exports = {getAllSubscriptions, getSubscriptionById, addSubscription, updateSubscription, deleteSubscription}