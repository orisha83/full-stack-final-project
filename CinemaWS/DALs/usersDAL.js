const jfile = require('jsonfile')

const readUsersFile = function()
{
    return new Promise((resolve,reject) =>
    {
        jfile.readFile("C:/Users/Ori/Desktop/fullstack/FullStackFinalProject/CinemaWS/DataSources/Users.json", function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                let usersArr = data.users
                //console.log(usersArr)
                resolve(usersArr)
            }
        })
    })
}

const writeUsersFile = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        jfile.writeFile("C:/Users/Ori/Desktop/fullstack/FullStackFinalProject/CinemaWS/DataSources/Users.json", obj, function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('OK')
            }
        })
    })
}

module.exports  =  {readUsersFile, writeUsersFile}