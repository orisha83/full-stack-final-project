import {useState, useEffect, useRef, useContext} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import {UsersContext} from './UsersContaxtApi'
import {LogInContext} from './LogInContaxtApi'
import Utils from './Utils'


function AddUserComp(params)
{
    const [fname, setFName] = useState("")
    const [lname, setLName] = useState("")
    const [userName, setUserName] = useState("")
    const [sessionTimeOut, setSessionTimeOut] = useState(0)
    const [newUsersId, setNewUsersId] = useState("")
    const [newUsersLoginId, setNewUsersLoginId] = useState("")
    const [pressed, setPressed] = useState(false)
    const [pressed2, setPressed2] = useState(false)
    const [permissions, setPermissions] = useState([])
    const [viewSubscription, setViewSubscription] = useState("")
    const [createSubscription, setCreateSubscription] = useState("");
    const [deleteSubscription, setDeleteSubscription] = useState("")
    const [updateSubscription, setUpdateSubscription] = useState("")
    const [viewMovies, setViewMovies] = useState("")
    const [createMovies, setCreateMovies] = useState("")
    const [deleteMovies, setDeleteMovies] = useState("")
    const [updateMovies, setUpdateMovies] = useState("")
    const [users, setUsers] = useContext(UsersContext);
    const {logInUsers} = useContext(LogInContext)
    const [logInUsersVar,setLogInUsersVar] = logInUsers

    const clickedSave = async () =>
    {
        let permissionsObj = []
        if(viewSubscription != "")
        permissionsObj.push(viewSubscription)
        
        if(createSubscription != "")
        permissionsObj.push(createSubscription)
        
        if(deleteSubscription != "")
        permissionsObj.push(deleteSubscription)

        if(updateSubscription != "")
        permissionsObj.push(updateSubscription)

        if(viewMovies != "")
        permissionsObj.push(viewMovies)

        if(createMovies != "")
        permissionsObj.push(createMovies)

        if(deleteMovies != "")
        permissionsObj.push(deleteMovies)

        if(updateMovies != "")
        permissionsObj.push(updateMovies)
        setPermissions(permissionsObj)


        let userObj = {firstName : fname, lastName : lname, userName : userName, password : "" , sessionTimeOut : sessionTimeOut, createdDate : new Date().toLocaleDateString('en-gb'), permissions : permissionsObj}
        let res = await Utils.sendDataToServer("Users", userObj)
        setNewUsersId(res.id)

        setNewUsersLoginId(res)
        params.clickedAllUsers()
    }

    const initialRender = useRef(true);
    useEffect( async () =>
    {
        if(initialRender.current){
            initialRender.current = false;
        }else{
                let res = await Utils.getDataFromServer("Users")
                setUsers(res)
                setPressed(true)
            }
    },[newUsersId])

    useEffect(() =>
    {
        if(createSubscription != "" && deleteSubscription != "" && updateSubscription != "")
        {
            setViewSubscription("View Subscriptions")
        }
    },[createSubscription, deleteSubscription, updateSubscription])

    useEffect(() =>
    {
        if(createMovies != "" && deleteMovies != "" && updateMovies != "")
        {
            setViewMovies("View Movies")
        }
    },[createMovies, deleteMovies, updateMovies])

       return(
        <div>
             <FormGroup>
                First Name:<TextField required label="Required" variant="outlined" size="small" onChange={e =>setFName(e.target.value)}/><br/>
                Last Name:<TextField required label="Required" variant="outlined" size="small" onChange={e =>setLName(e.target.value)}/><br/>
                User Name:<TextField required label="Required" variant="outlined" size="small" onChange={e =>setUserName(e.target.value)}/><br/>
                Session time out (Minuts):
                <TextField required label="Required" variant="outlined" size="small" onChange={e =>setSessionTimeOut(e.target.value)}/>
                <h3>Permissions :</h3>
            </FormGroup>
            <FormGroup row>
                <FormControlLabel control={<Checkbox checked={viewSubscription} onChange={e => {if(e.target.checked){setViewSubscription(e.target.name)}else{setViewSubscription("")}}} size="small"/>}label="View Subscriptions" name="View Subscriptions" />
                &nbsp;&nbsp;&nbsp;&nbsp;         
                <FormControlLabel control={<Checkbox onChange={e => {if(e.target.checked){setCreateSubscription(e.target.name)}else{setCreateSubscription("")}}} size="small"/>}label="Create Subscription" name="Create Subscription"/>
                <FormControlLabel control={<Checkbox onChange={e => {if(e.target.checked){setDeleteSubscription(e.target.name)}else{setDeleteSubscription("")}}} size="small"/>}label="Delete Subscription" name="Delete Subscription"/>
            </FormGroup>
            <FormGroup row>
                <FormControlLabel control={<Checkbox onChange={e => {if(e.target.checked){setUpdateSubscription(e.target.name)}else{setUpdateSubscription("")}}} size="small"/>}label="Update Subscription" name="Update Subscription"/>
                <FormControlLabel control={<Checkbox checked={viewMovies} onChange={e => {if(e.target.checked){setViewMovies(e.target.name)}else{setViewMovies("")}}} size="small"/>}label="View Movies" name="View Movies"/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FormControlLabel control={<Checkbox onChange={e => {if(e.target.checked){setCreateMovies(e.target.name)}else{setCreateMovies("")}}} size="small"/>}label="Create Movie" name="Create Movie"/>
            </FormGroup>
            <FormGroup row>
                <FormControlLabel control={<Checkbox onChange={e => {if(e.target.checked){setDeleteMovies(e.target.name)}else{setDeleteMovies("")}}} size="small"/>}label="Delete Movie" name="Delete Movie" />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FormControlLabel control={<Checkbox onChange={e => {if(e.target.checked){setUpdateMovies(e.target.name)}else{setUpdateMovies("")}}} size="small"/>}label="Update Movie" name="Update Movie"/>
            </FormGroup>
                
            <Grid container direction="row" justify="center" >
                <Grid item>
                    <Button style={{textTransform: 'none'}} startIcon={<SaveIcon />} variant="contained" size='large' onClick={clickedSave}></Button> 
                </Grid>
                <Grid item>
                    <Button style={{textTransform: 'none'}} startIcon={<CancelIcon />} variant="contained" size='large' onClick={() => params.clickedAllUsers()}></Button> 
                </Grid>
            </Grid> 
        </div>
    )
}

export default AddUserComp;

