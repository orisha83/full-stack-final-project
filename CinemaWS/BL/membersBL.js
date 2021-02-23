const membersDAL = require('../DALs/membersApiDAL')

const getAllMembers = async function()
{
    let allMembers = await membersDAL.getMembers()
    return allMembers.data
}

const getMemberById = async function(id)
{
    let Member = await membersDAL.getMemberById(id)
    return Member.data
}

const addMember = async function(movieObj)
{
    let res = await membersDAL.addMember(movieObj)
    return res.data
}

const updateMember = async function(id, movieObj)
{
    let res = await membersDAL.updateMember(id, movieObj)
    return res.data
}

const deleteMember = async function(id)
{
    let res = await membersDAL.deleteMember(id)
    return res.data
}

module.exports = {getAllMembers, getMemberById, addMember, updateMember, deleteMember}