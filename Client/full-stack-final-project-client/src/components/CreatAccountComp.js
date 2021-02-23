import {useState, useContext} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link, useHistory} from 'react-router-dom'
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {LogInContext} from './LogInContaxtApi'
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

function CreateAccountComp() 
{
    const classes = useStyles()
    const {logInUsers} = useContext(LogInContext)
    const [logInUsersVar,setLogInUsersVar] = logInUsers
    const [user,setUser] = useState("")
    const [pass,setPass] = useState("")
    const [isLogInFailed, setIsLogInFailed] = useState(false)
    const history = useHistory()

    const ClickedCreated = () =>
    {
        let logedUser = logInUsersVar.find(x => x.userName == user)
        if(logedUser)
        {
            logedUser.password = pass
            Utils.updateServer('Users', logedUser._id, logedUser)

            let userIndex = logInUsersVar.findIndex(x => x.userName == user)
            let currentUsersLogin = logInUsersVar
            currentUsersLogin[userIndex] = logedUser
            setLogInUsersVar(currentUsersLogin)
            history.push('/LogIn')
        }
        else
        {
            setIsLogInFailed(true)
            setUser("")
            setPass("")
        }
    }
       return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
            {
            <FormGroup className={classes.paper}>
                       <h2>Create an Account</h2>
                <TextField required id="outlined-basic" label="User Name" variant="outlined" value={user} onChange={e => setUser(e.target.value)}/><br/><br/>
                <TextField required  id="outlined-basic" label="Password" variant="outlined" value={pass} onChange={e => setPass(e.target.value)}/><br/><br/>
            <Grid container direction="row" justify="center" >
            <Grid item>
                {isLogInFailed && <h3>Failed To Create!</h3>}
                {isLogInFailed && <h3>To Create An Account the User Must</h3>} 
                {isLogInFailed && <h3>be created in the system by the Admin</h3>}
            </Grid>
                <Grid item>
                    <Button style={{textTransform: 'none'}} variant="contained" size='large' onClick={ClickedCreated}>Create</Button>
                </Grid>
                <Grid item>
                    <Link style={{ textDecoration: 'none' }} to="/LogIn"><Button style={{textTransform: 'none'}}  size='large' variant="contained">Cancel</Button></Link>
                </Grid>
            </Grid>
            </FormGroup>
            }
          </Grid>
        </div>
    )
}

export default CreateAccountComp;

