import axios from 'axios'

const getDataFromServer = async function (collection) 
{
    let DataArr = []
    let res
    switch (collection) {
        case 'Users':
            res = await axios.get("http://localhost:5000/api/users")
            DataArr = res.data
        break;
        case 'Movies':
            res = await axios.get("http://localhost:5000/api/movies")
            DataArr = res.data
        break;
        case 'Members':
            res = await axios.get("http://localhost:5000/api/members")
            DataArr = res.data
        break;
        case 'Subscriptions':
            res = await axios.get("http://localhost:5000/api/subscriptions")
            DataArr = res.data
        break;
          
        default:
    }
    return DataArr
}

const getSpecificDocFromServer = async function (collection, docId) 
{
    let res
    let DataArr = []
    switch (collection) {
        case 'Users':
            res = await axios.get("http://localhost:5000/api/users/" + docId)
            DataArr = res.data
        break;
        case 'Movies':
            res = await axios.get("http://localhost:5000/api/movies/" + docId)
            DataArr = res.data
        break;
        case 'Members':
            res = await axios.get("http://localhost:5000/api/members/" + docId)
            DataArr = res.data
        break;
        case 'Subscriptions':
            res = await axios.get("http://localhost:5000/api/subscriptions/" + docId)
            DataArr = res.data
        break;
          
        default:
    }

    return DataArr
}

const deleteDataFromServer = async function (collection, id ) 
{
    let res
    let DataArr = []
    switch (collection) {
        case 'Users':
            res = await axios.delete("http://localhost:5000/api/users/" + id)
            DataArr = res.data
        break;
        case 'Movies':
            res = await axios.delete("http://localhost:5000/api/movies/" + id)
            DataArr = res.data
        break;
        case 'Members':
            res = await axios.delete("http://localhost:5000/api/members/" + id)
            DataArr = res.data
        break;
        case 'Subscriptions':
            res = await axios.delete("http://localhost:5000/api/subscriptions/" + id)
            DataArr = res.data
        break;
          
        default:
    }

    return DataArr
}

const sendDataToServer = async function (collection, jsonObj ) 
{
    let res
    let DataArr = []
    switch (collection) {
        case 'Users':
            res = await axios.post("http://localhost:5000/api/users", jsonObj)
            DataArr = res.data
        break;
        case 'Movies':
            res = await axios.post("http://localhost:5000/api/movies", jsonObj)
            DataArr = res.data
        break;
        case 'Members':
            res = await axios.post("http://localhost:5000/api/members", jsonObj)
            DataArr = res.data
        break;
        case 'Subscriptions':
            res = await axios.post("http://localhost:5000/api/subscriptions", jsonObj)
            DataArr = res.data
        break;
          
        default:
    }

    return DataArr
}

const updateServer = async function (collection, id , jsonObj ) 
{
    let res
    let DataArr = []
    switch (collection) {
        case 'Users':
            res = await axios.put("http://localhost:5000/api/users/" + id, jsonObj)
            DataArr = res.data
        break;
        case 'Movies':
            res = await axios.put("http://localhost:5000/api/movies/" + id, jsonObj)
            DataArr = res.data
        break;
        case 'Members':
            res = await axios.put("http://localhost:5000/api/members/" + id, jsonObj)
            DataArr = res.data
        break;
        case 'Subscriptions':
            res = await axios.put("http://localhost:5000/api/subscriptions/" + id, jsonObj)
            DataArr = res.data
        break;
          
        default:
    }

    return DataArr
}

export default {sendDataToServer, getDataFromServer, updateServer, deleteDataFromServer, getSpecificDocFromServer};

