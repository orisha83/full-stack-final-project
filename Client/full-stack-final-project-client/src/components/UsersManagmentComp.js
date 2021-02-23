import {useState, useContext} from 'react'
import Button from '@material-ui/core/Button';
import UserComp from './UserComp'
import AddUserComp from './AddUserComp'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {UsersContext} from './UsersContaxtApi'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(5),     
      borderColor : 'black',
      borderStyle: 'solid',
      borderWidth: '2px',
    },
  }));

function SubscriptionsComp()
{
    const classes = useStyles()
    const [allUsersButtonColor,setAllUsersButtonColor] = useState("primary")
    const [addUserButtonColor,setAddUserButtonColor] = useState("")
    const [allUsersPage, setAllUsersPage] = useState(true)
    const [addUserPage, setAddUserPage] = useState(false)
    const [users, setUsers] = useContext(UsersContext);


    const clickedAllUsers = () => 
    {
        setAddUserButtonColor("")
        setAllUsersButtonColor("primary")
        setAllUsersPage(true)
        setAddUserPage(false)
    }

    const clickedAddUser = () => 
    {
        setAllUsersButtonColor("")
        setAddUserButtonColor("primary")
        setAllUsersPage(false)
        setAddUserPage(true)
    }

       return(
        <div >
            <Grid container direction="column" alignItems="center">
                <Grid  item >
                <Typography variant="h5" gutterBottom align="center">
                Users Managment
                    </Typography>
                </Grid>
                <Grid item container direction="row" justify="center">
                    <Grid item >
                        <Button style={{textTransform: 'none'}} variant="contained" color={allUsersButtonColor} onClick={clickedAllUsers}>All Users</Button>
                    </Grid>
                    <Grid item >
                        <Button style={{textTransform: 'none'}} variant="contained" color={addUserButtonColor} onClick={clickedAddUser}>Add User</Button>
                    </Grid>
                </Grid>
                <Grid item container direction="column" alignItems="center"> 
                    {allUsersPage && users && users.map((item,index) => {return <div><Grid item className={classes.paper}><UserComp userDetails={item}/></Grid><br/></div>})}
                    {addUserPage && <Grid item className={classes.paper}><AddUserComp clickedAllUsers={clickedAllUsers}/></Grid>}
                </Grid>
           </Grid>
        </div>
    )
}

export default SubscriptionsComp;

