let members = require('../Models/membersModel')
const membersDAL = require('../DALs/membersDAL');

const getMembersFromWSToDB = async function()
{
    console.log("getMembersFromWSToDB")

    let resp = await membersDAL.getMembers()
    let allMembersArr = resp.data

    allMembersArr.forEach(member => 
    {
        let memberObj = {name : member.name, email : member.email, city : member.address.city}
        let res = addMember(memberObj)
        if(res == 'OK')
        {
            return 'OK'
        }
        else
        {
            return 'FALIURE'
        }
    })    
}


const getAllMembers = function()
{
    return new Promise((resolve, reject) =>
    {
        members.find({}, function(err,result)
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

const getMemberById = function(id)
{
    return new Promise((resolve, reject) =>
    {
        members.findById(id,function(err,member)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(member)
            }
        })
    })
}

const addMember = function(mem)
{
    return new Promise((resolve, reject) =>
    {
        const s = new members({
            name : mem.name,
            email : mem.email,
            city : mem.city
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

const updateMember = function(id, obj)
{
    return new Promise((resolve, reject) =>
    {
        members.findByIdAndUpdate(id, 
            {
                name : obj.name,
                email : obj.email,
                city : obj.city
            }, function(err)
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

const deleteMember = function(id)
{
    return new Promise((resolve, reject) =>
    {
        members.findByIdAndDelete(id, function(err)
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

module.exports = {getAllMembers, getMemberById, addMember, updateMember, deleteMember, getMembersFromWSToDB}