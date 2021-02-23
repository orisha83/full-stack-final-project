let axios = require('axios')

const getMembers = function()
{
    return axios.get("http://localhost:8000/api/members");
}

const getMemberById = function(id)
{
    return axios.get("http://localhost:8000/api/members/" + id);
}

const addMember = function(movieObj)
{
    return axios.post("http://localhost:8000/api/members", movieObj)
}

const updateMember = function(id, movieObj)
{
    return axios.put("http://localhost:8000/api/members/" + id, movieObj)
}

const deleteMember = function(id)
{
    return axios.delete("http://localhost:8000/api/members/" + id)
}

module.exports  =  {getMembers, getMemberById, addMember, updateMember, deleteMember}