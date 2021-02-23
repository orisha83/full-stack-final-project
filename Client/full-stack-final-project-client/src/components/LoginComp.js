import {useState, useContext} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import {LogInContext} from './LogInContaxtApi'

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
      },
    button: {
        color : 'white'
      },
      paper: {
        padding: theme.spacing(3),
        borderColor : 'black',
        borderStyle: 'solid',
        borderWidth: '2px',
      },
  }));

function LoginComp()
{
    const classes = useStyles();
    const [user,setUser] = useState("")
    const [pass,setPass] = useState("")
    const [isLogInFailed, setIsLogInFailed] = useState(false)
    const history = useHistory()
    const {isLogedIn, logInUsers, logInUser, isAdmin } = useContext(LogInContext)

    const [isLogedInVar,setIsLogedInVar] = isLogedIn
    const [logInUsersVar,setLogInUsersVar] = logInUsers
    const [logInUserVar,setLogInUserVar] = logInUser
    const [isAdminVar,setIsAdminVar] = isAdmin

    const clickedLogin = () =>
    {
        let logedUser = logInUsersVar.find(x => x.userName == user && x.password == pass)
        if(logedUser)
        {
            let LogedInUser = {user: user , pass : pass}
            setLogInUserVar(LogedInUser)
            if(user == 'orisha')
            {
                setIsAdminVar(true)
            }
            else
            {
                setIsAdminVar(false)
            }
            history.push('/')
            setIsLogedInVar(true)
            setIsLogInFailed(false)
        }
        else
        {
            setIsLogInFailed(true)
            setUser("")
            setPass("")
        }
    }

    const clickedNewAccount = () =>
    {
        history.push('/NewAccount')
    }

       return(
        <div> 
                    <Grid container direction="column" justify="center" alignItems="center">
                        <FormGroup className={classes.paper}>
                            <h2>Welcome To The Log In Page</h2>
                            <TextField required id="outlined-basic" label="User Name" variant="outlined" value={user} onChange={e => setUser(e.target.value)}/><br/>
                            <TextField required  id="outlined-basic" label="Password" variant="outlined" value={pass} onChange={e => setPass(e.target.value)}/><br/>
                            <Grid container direction="row" justify="center" >
                                <Grid item>
                                    <Button style={{textTransform: 'none'}} variant="contained" onClick={clickedLogin}>Login</Button>
                                </Grid>
                                <Grid item container direction="column" alignItems="center"><br/>
                                <Grid item>
                                    {isLogInFailed && <h3>Failed To LogIn!</h3>}
                                    {isLogInFailed && <h3>User or Password are Incorrect</h3>} 
                                    {isLogInFailed && <h3>please try again</h3>}
                                </Grid>
                                    Don't have an account yet? 
                                <Button style={{textTransform: 'none'}} variant="contained" onClick={clickedNewAccount}>Create A New Account</Button>
                            </Grid>
                            </Grid>
                        </FormGroup>       
                    </Grid>
        </div>
    )
}

export default LoginComp;

