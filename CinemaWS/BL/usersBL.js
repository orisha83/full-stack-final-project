let users = require('../Models/usersModel')
let usersDAL = require('../DALs/usersDAL')
let permissionsDAL = require('../DALs/permissionsDAL')

const getDBUserById = async function(id)
{
    return new Promise((resolve, reject) =>
    {
        users.findById(id, function(err,user)
        {
            if(err)
            {
                reject(err)
            }
            else
            { 
                resolve(user)
            }
        })
    })
}

const getDBUsers = async function()
{
    return new Promise((resolve, reject) =>
    {
        users.find({}, function(err,dbUsers)
        {
            if(err)
            {
                reject(err)
            }
            else
            { 
                resolve(dbUsers)
            }
        })
    })
}

const getUserFromUsersFile = async function(id)
{
    let usersFromFileArr = await usersDAL.readUsersFile()
    let userFromFile = usersFromFileArr.find(user => user.id == id)
    if(userFromFile)
    {
        return userFromFile
    }
    else
    {
        return ""
    }
    
}

const getPermissionFromPermissionsFile = async function(id)
{
    let permissionsFromFileArr = await permissionsDAL.readPermissionsFile()
    let permissionFromFile = permissionsFromFileArr.find(per => per.id == id)
    if(permissionFromFile)
    {
        return permissionFromFile
    }
    else
    {
        return ""
    }
}
    

const getAllUsers = async function()
{
    let bdUsers = await getDBUsers()
    if(bdUsers.length > 0)
    {
        let finalUsersData = await Promise.all(bdUsers.map(async x =>
        {
            console.log(x)
            let userFromFile = await getUserFromUsersFile(x._id)

            let permissionFromFile = await getPermissionFromPermissionsFile(x._id)

            return {_id : x.id, userName : x.userName, password : x.password, firstName : userFromFile.firstName, lastName : userFromFile.lastName, 
                createdDate : userFromFile.createdDate, sessionTimeOut : userFromFile.sessionTimeOut, permissions : permissionFromFile.permissions}
        }))

        console.log(finalUsersData)
        return finalUsersData
    }
}

const getUserById = async function(id)
{
    let bdUsers = await getDBUserById(id)
    if(bdUsers)
    {
        let userFromFile = await getUserFromUsersFile(id)

        let permissionFromFile = await getPermissionFromPermissionsFile(id)

        finalUser = {_id : bdUsers.id, userName : bdUsers.userName, password : bdUsers.password, firstName : userFromFile.firstName, lastName : userFromFile.lastName, 
            createdDate : userFromFile.createdDate, sessionTimeOut : userFromFile.sessionTimeOut, permissions : permissionFromFile.permissions}
        
        console.log(finalUser)
        return finalUser
    }
    else
    {
        return ""
    }
}

const addUserToDB = function(user)
{
    return new Promise((resolve, reject) =>
    {
        const s = new users({
            userName : user.userName,
            password : user.password
        })
        console.log(s)
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

const addUserToUsersFile = async function(user, id)
{
    let userForUsersFileObj = {id : id, firstName : user.firstName, lastName : user.lastName, createdDate : user.createdDate, sessionTimeOut : user.sessionTimeOut}
    let usersFileArr = await usersDAL.readUsersFile()
    usersFileArr.push(userForUsersFileObj)
    let usersFileObj = {users : usersFileArr}
    let res = await usersDAL.writeUsersFile(usersFileObj)
    return res
}

const addUserToPermissionsFile = async function(user, id)
{
    let userForPermissionsFileObj = {id : id, permissions : user.permissions}
    let permissionsFileArr = await permissionsDAL.readPermissionsFile()
    permissionsFileArr.push(userForPermissionsFileObj)
    permissionsFileObj = {permissions : permissionsFileArr}
    let res = await permissionsDAL.writePermissionsFile(permissionsFileObj)
    return res
}

const addUser = async function(user)
{
    console.log(user)
    let returnedId = await addUserToDB(user)
    if(returnedId != "")
    {
        let resFromUsersFileCreation = await addUserToUsersFile(user, returnedId)
        if(resFromUsersFileCreation == "OK")
        {
            let resFromPermissionsFileCreation = await addUserToPermissionsFile(user,returnedId)
            if(resFromPermissionsFileCreation == "OK")
            {   
                return "OK"
            }
            else
            {
                return "failure to write to permissions file"
            }
        }
        else
        {
            return "failure to write to users file"
        }
    }
    else
    {
        return "failure to write to DB"
    }
}

const updateDBUser = function(id, obj)
{
    return new Promise((resolve, reject) =>
    {
        users.findByIdAndUpdate(id, obj, function(err)
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

const updateUserInUsersFile = async function(id, obj)
{
    let usersFileArr = await usersDAL.readUsersFile()
    let userIndex = usersFileArr.findIndex(x => x.id == id)
    if(userIndex >= 0)
    {
        usersFileArr[userIndex] = obj
        let usersFileObj = {users : usersFileArr}
        let res = await usersDAL.writeUsersFile(usersFileObj)
        return res
    }
    else
    {
        return "couldn't find user in users file"
    }
}

const updatePermissionsInPermissionsFile = async function(id, obj)
{
    let permissionsFileArr = await permissionsDAL.readPermissionsFile()
    let userIndex = permissionsFileArr.findIndex(x => x.id == id)
    if(userIndex >= 0)
    {
        permissionsFileArr[userIndex] = obj
        let permissionsFileObj = {permissions : permissionsFileArr}
        let res = await permissionsDAL.writePermissionsFile(permissionsFileObj)
        return res
    }
    else
    {
        return "couldn't find user in permissions file"
    }
}

const updateUser = async function(id, obj)
{
    DBObject = {userName : obj.userName, password : obj.password}
    let resFromDB = await updateDBUser(id, DBObject)
    if(resFromDB == "OK")
    {
        let usersFileObject = {id : id, firstName : obj.firstName, lastName : obj.lastName, createdDate : obj.createdDate, sessionTimeOut : obj.sessionTimeOut}
        let resFromUsers = await updateUserInUsersFile(id, usersFileObject)
        if(resFromUsers == "OK")
        {
            let permissionsFileObject = {id : id, permissions : obj.permissions}
            let resFromPermissions = await updatePermissionsInPermissionsFile(id, permissionsFileObject)
            if(resFromPermissions == "OK")
            {
                return "OK"
            }
            else
            {
                return "failure to update permissions file"
            }
        }
        else
        {
            return "failure to update users file"
        }
    }
    else
    {
        return "failure to update the DB"
    }
}

const deleteDBUser = function(id)
{
    return new Promise((resolve, reject) =>
    {
        users.findByIdAndDelete(id, function(err)
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

const deleteUserFromUsersFile = async function(id)
{
    let usersFileArr = await usersDAL.readUsersFile()
    let usersFileArrFiltered = usersFileArr.filter(x => x.id != id)
    let usersFileObj = {users : usersFileArrFiltered}
    let res = await usersDAL.writeUsersFile(usersFileObj)
    return res
}

const deleteUserFromPermissionsFile = async function(id)
{
    let permissionsFileArr = await permissionsDAL.readPermissionsFile()
    let permissionsFileArrFiltered = permissionsFileArr.filter(x => x.id != id)
    let permissionsFileObj = {users : permissionsFileArrFiltered}
    let res = await permissionsDAL.writePermissionsFile(permissionsFileObj)
    return res
}

const deleteUser = async function(id)
{   
    let resFromDB = await deleteDBUser(id)
    if(resFromDB == "OK")
    {
        let resFromUsers = await deleteUserFromUsersFile(id)
        if(resFromUsers == "OK")
        {
            let resFromPermissionsFile = await deleteUserFromPermissionsFile(id)
            if(resFromPermissionsFile == "OK")
            {
                return "OK"
            }
            else
            {
                return "failed to delete user from permissions file"
            }
        }
        else
        {
            return "failed to delete user from users file"
        }
    }
    else
    {
        return "failed to delete user from DB"
    }
}

module.exports = {getAllUsers, getUserById, addUser, updateUser, deleteUser}