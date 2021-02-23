const jfile = require('jsonfile')

const readPermissionsFile = function()
{
    return new Promise((resolve,reject) =>
    {
        jfile.readFile("C:/Users/Ori/Desktop/fullstack/FullStackFinalProject/CinemaWS/DataSources/Permissions.json", function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                let permissionsArr = data.permissions
                //console.log(permissionsArr)
                resolve(permissionsArr)
            }
        })
    })
}

const writePermissionsFile = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        jfile.writeFile("C:/Users/Ori/Desktop/fullstack/FullStackFinalProject/CinemaWS/DataSources/Permissions.json", obj, function(err)
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

module.exports  =  {readPermissionsFile, writePermissionsFile}