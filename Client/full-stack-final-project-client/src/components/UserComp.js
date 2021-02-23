import {useContext} from 'react'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import {UsersContext} from './UsersContaxtApi'
import {LogInContext} from './LogInContaxtApi'
import Utils from './Utils'


function UserComp(props)
{
    const [users, setUsers] = useContext(UsersContext); 
    const {logInUsers} = useContext(LogInContext)
    const [logInUsersVar,setLogInUsersVar] = logInUsers

    const deleteUser = () =>
    {
        let currentUsersArray = users
        let usersArrayAfterDelete = currentUsersArray.filter(x => x._id != props.userDetails._id)
        setUsers(usersArrayAfterDelete)
        Utils.deleteDataFromServer("Users", props.userDetails._id)
    }

    const clickedDelete = () =>
    {
        confirmAlert({
            title: 'Are you sure you want to delete User:',  // Title dialog
            message: props.userDetails.firstName,               // Message dialog
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => deleteUser()
                },
                {
                  label: 'No'
                }
              ]
          })
    }
   
       return(
        <div>
            Name :  {props.userDetails.firstName}  {props.userDetails.lastName}<br/>
            User Name : {props.userDetails.userName}<br/>
            Session time out (Minuts) : {props.userDetails.sessionTimeOut}<br/>
            Created date : {props.userDetails && props.userDetails.createdDate}<br/>
            Permissions:
            <ul>
                {props.userDetails.permissions && props.userDetails.permissions.map((item,index) => {return <li key={index}>{item}</li>})}
            </ul>
            <Grid container direction="row" justify="center" >
                <Grid item>
                    <Link to={`/UsersManagment/Edit/${props.userDetails._id}`} style={{ textDecoration: 'none' }}><Button style={{textTransform: 'none'}} startIcon={<EditIcon />} size='large' variant="contained"></Button></Link>
                </Grid>
                <Grid item>
                    <Button style={{textTransform: 'none'}} variant="contained" startIcon={<DeleteIcon />} size='large' onClick={clickedDelete}></Button> 
                </Grid>
            </Grid> 
        </div>
    )
}

export default UserComp;

