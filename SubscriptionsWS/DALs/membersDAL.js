const axios = require('axios');

const getMembers = function()
{
    return axios.get("https://jsonplaceholder.typicode.com/users");
}

module.exports  =  {getMembers}