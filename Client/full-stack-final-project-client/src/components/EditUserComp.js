import {useState, useEffect, useContext} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom'
import CancelIcon from '@material-ui/icons/Cancel';
import UpdateIcon from '@material-ui/icons/Update';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import {UsersContext} from './UsersContaxtApi'
import Utils from './Utils'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      borderColor : 'black',
      borderStyle: 'solid',
      borderWidth: '2px',
    },
  }));



function EditUserComp(props)
{
    const classes = useStyles()
    const [users, setUsers] = useContext(UsersContext);
    const [editUser, setEditUser] = useState("")
    
    const [fname, setFName] = useState("")
    const [lname, setLName] = useState("")
    const [userName, setUserName] = useState("")
    const [sessionTimeOut, setSessionTimeOut] = useState(0)

    const [viewSubscription, setViewSubscription] = useState("")
    const [createSubscription, setCreateSubscription] = useState("");
    const [deleteSubscription, setDeleteSubscription] = useState("")
    const [updateSubscription, setUpdateSubscription] = useState("")
    const [viewMovies, setViewMovies] = useState("")
    const [createMovies, setCreateMovies] = useState("")
    const [deleteMovies, setDeleteMovies] = useState("")
    const [updateMovies, setUpdateMovies] = useState("")


    const assignCheckBoxses = () =>
    {
        if(editUser != "")
        {                
            editUser.permissions.forEach(item =>
            {
                switch(item) {
                    case 'Delete Movie': 
                    setDeleteMovies("Delete Movie")
                    break;
                
                    case 'Create Movie':  
                    setCreateMovies("Create Movie")
                    break;

                    case 'Update Movie':  
                    setUpdateMovies("Update Movie")
                    break;
                
                    case 'View Movies':  
                    setViewMovies("View Movies")
                    break;

                    case 'Create Subscription': 
                    setCreateSubscription("Create Subscription")
                    break;
                
                    case 'Delete Subscription': 
                    setDeleteSubscription("Delete Subscription")
                    break;

                    case 'Update Subscription': 
                    setUpdateSubscription("Update Subscription")
                    break;
                
                    case 'View Subscriptions':  
                    setViewSubscription("View Subscriptions")
                    break;
                
                    default:
                    //code here
                    break;
                }
            })
        }
    }

    const clickedUpdate = () =>
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

        let UserToUsers = {_id : props.match.params.id , firstName : fname, lastName : lname, userName : userName, sessionTimeOut : sessionTimeOut, createdDate : editUser.createdDate, permissions : permissionsObj, password : editUser.password}
        let UserObjToServer = {firstName : fname, lastName : lname, userName : userName, sessionTimeOut : sessionTimeOut, createdDate : editUser.createdDate, permissions : permissionsObj, password : editUser.password}
        let UsersArray = users
        let UserIndex = users.findIndex(x => x._id == UserToUsers._id )
        if(UserIndex >= 0 )
        {
            UsersArray[UserIndex] = UserToUsers
            setUsers(UsersArray)
             Utils.updateServer('Users', UserToUsers._id, UserObjToServer)
        }
    }

    const form = () => 
    {
      let userIndex = users.findIndex(x => x._id == props.match.params.id )
      if(userIndex >= 0 )
      {
        setEditUser(users[userIndex])
        setFName(users[userIndex].firstName)
        setLName(users[userIndex].lastName)
        setUserName(users[userIndex].userName)
        setSessionTimeOut(users[userIndex].sessionTimeOut)
      }     
    }

    useEffect(() => {
      form()
    },[])

    useEffect(() => {
        assignCheckBoxses()
      },[editUser])


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
            <Grid container direction="column" justify="center" alignItems="center">
                <FormGroup className={classes.paper}>
                    <h3>Edit User : {props.match.params.name}</h3>
                
                    First Name:<TextField required id="outlined-basic" placeholder={editUser && editUser.firstName} onChange={e =>setFName(e.target.value)} variant="outlined"/><br/>
                    Last Name:<TextField required id="outlined-basic" placeholder={editUser && editUser.lastName} onChange={e =>setLName(e.target.value)} variant="outlined" /><br/>
                    User Name:<TextField required id="outlined-basic" placeholder={editUser && editUser.userName} onChange={e =>setUserName(e.target.value)} variant="outlined" /><br/>
                    Session time out (Minuts):
                    <TextField required id="outlined-basic" placeholder={editUser && editUser.sessionTimeOut} onChange={e =>setSessionTimeOut(e.target.value)} variant="outlined" /><br/>
                    Created date : {editUser && editUser.createdDate}<br/>
                    <h3>Permissions :</h3>
                    <FormGroup row>
                        <FormControlLabel control={<Checkbox checked={viewSubscription} onChange={e => {if(e.target.checked){setViewSubscription(e.target.name)}else{setViewSubscription("")}}} size="small"/>}label="View Subscriptions" name="View Subscriptions"/>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <FormControlLabel control={<Checkbox checked={createSubscription} onChange={e => {if(e.target.checked){setCreateSubscription(e.target.name)}else{setCreateSubscription("")}}} size="small"/>}label="Create Subscription" name="Create Subscription"/>
                        <FormControlLabel control={<Checkbox checked={deleteSubscription} onChange={e => {if(e.target.checked){setDeleteSubscription(e.target.name)}else{setDeleteSubscription("")}}} size="small"/>}label="Delete Subscription" name="Delete Subscription"/>
                    </FormGroup>
                    <FormGroup row>
                        <FormControlLabel control={<Checkbox checked={updateSubscription} onChange={e => {if(e.target.checked){setUpdateSubscription(e.target.name)}else{setUpdateSubscription("")}}} size="small"/>}label="Update Subscription" name="Update Subscription"/>
                        <FormControlLabel control={<Checkbox checked={viewMovies} onChange={e => {if(e.target.checked){setViewMovies(e.target.name)}else{setViewMovies("")}}} size="small"/>}label="View Movies" name="View Movies"/>
                        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                        <FormControlLabel control={<Checkbox checked={createMovies} onChange={e => {if(e.target.checked){setCreateMovies(e.target.name)}else{setCreateMovies("")}}} size="small"/>}label="Create Movie" name="Create Movie"/>
                    </FormGroup>
                    <FormGroup row>
                        <FormControlLabel control={<Checkbox checked={deleteMovies} onChange={e => {if(e.target.checked){setDeleteMovies(e.target.name)}else{setDeleteMovies("")}}} size="small"/>}label="Delete Movie" name="Delete Movie"/>
                        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FormControlLabel control={<Checkbox checked={updateMovies} onChange={e => {if(e.target.checked){setUpdateMovies(e.target.name)}else{setUpdateMovies("")}}} size="small"/>}label="Update Movie" name="Update Movie"/>
                    </FormGroup>
                    
                <Grid container direction="row" justify="center" >
                    <Grid item>
                    <Link style={{ textDecoration: 'none' }} to="/UsersManagment"><Button style={{textTransform: 'none'}} startIcon={<UpdateIcon />} variant="contained" size='large' onClick={clickedUpdate}></Button></Link>
                    </Grid>
                     <Grid item>
                        <Link style={{ textDecoration: 'none' }} to="/UsersManagment"><Button style={{textTransform: 'none'}} startIcon={<CancelIcon />} size='large' variant="contained"></Button></Link> 
                    </Grid>
                </Grid> 
            </FormGroup>
        </Grid>
            
    </div>
    )
}

export default EditUserComp;

