import {useState, useEffect, useContext} from 'react'
import Button from '@material-ui/core/Button';
import {Link, Switch,Route, useHistory} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Utils from './Utils'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { MoviesContext } from "./MoviesContaxtApi";
import {MembersContext} from './MembersContextApi'
import {UsersContext} from './UsersContaxtApi'
import {LogInContext} from './LogInContaxtApi'
import { SubscriptionsContext } from './SubscriptionsContaxtApi'
import SubscriptionsComp from './SubscriptionsComp'
import MoviesComp from './MoviesComp'
import MovieComp from './MovieComp'
import EditMovieComp from './EditMovieComp'
import EditMemberComp from './EditMemberComp'
import EditUserComp from './EditUserComp'
import MemberComp from './MemberComp'
import UserManagmentComp from './UsersManagmentComp'
import CreateAccountComp from './CreatAccountComp'
import LoginComp from './LoginComp'
import EntryComp from './EntryComp'
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
    appbar: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
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

function MainComp()
{
    const classes = useStyles();
    const history = useHistory()

    const {isLogedIn, logInUsers, logInUser , isAdmin} = useContext(LogInContext)

    const [isLogedInVar,setIsLogedInVar] = isLogedIn
    const [logInUsersVar,setLogInUsersVar] = logInUsers
    const [logInUserVar,setLogInUserVar] = logInUser
    const [isAdminVar,setIsAdminVar] = isAdmin

    const [movies, setMovies] = useContext(MoviesContext)
    const [members, setMembers] = useContext(MembersContext);
    const [users, setUsers] = useContext(UsersContext);
    const [subscriptions, setSubscriptions] = useContext(SubscriptionsContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const logingOut = () =>
    {
        setLogInUserVar("")
        setIsLogedInVar(false)
        history.push('/LogIn')
    }

    const clickedLogOut = () =>
    {
        handleClose()
        confirmAlert({
            title: 'Are you sure you want to Log Out?',                
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => logingOut()
                },
                {
                  label: 'No'
                }
              ]
          })
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    const getUsers = async () =>
    {
        let res = await Utils.getDataFromServer("Users")
        setUsers(res)
        setLogInUsersVar(res)
    }

    const getMovies = async () =>
    {
        let res = await Utils.getDataFromServer("Movies")
        setMovies(res)
    }

    const getMembers = async () =>
    {
        let res = await Utils.getDataFromServer("Members")
        setMembers(res)
    }

    const getSubscriptions = async () =>
    {
        let res = await Utils.getDataFromServer("Subscriptions")
        setSubscriptions(res)
    }

    /*const getUsersLogin = async () =>
    {
        let res = await Utils.getDataFromServer("UsersLogin")
        setLogInUsersVar(res)
    }*/

    useEffect( async () => {
        getMovies()
        getMembers()
        getUsers()
        getSubscriptions()
        //getUsersLogin()
        setIsLogedInVar(false)
    },[])
   
       return(
        <div >
           <AppBar position="sticky" className={classes.appbar}>
          <Toolbar >
              <Grid container direction="row" justify="center" spacing={5}>
                    <Grid item>
                       {isLogedInVar 
                        ? <Link to="/Movies" className={classes.link}><Button className={classes.button} >Movies</Button></Link>
                        : <Link to="/LogIn" className={classes.link}><Button className={classes.button} >Log In</Button></Link> 
                       }
                    </Grid>
                    <Grid item>
                        {isLogedInVar 
                            ? <Link to="/Subscriptions" className={classes.link}><Button className={classes.button}>Subscriptions</Button></Link>
                            : <Link to="/NewAccount" className={classes.link}><Button className={classes.button}>Sign In</Button></Link>
                        }
                    </Grid>
                    <Grid item>
                        {isAdminVar && isLogedInVar && <Link to="/UsersManagment" className={classes.link}><Button className={classes.button}>User Managment</Button></Link>}
                    </Grid>
                    <Grid item>
                    {isLogedInVar && 
                                <div>
                                    <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted 
                                                transformOrigin={{vertical: 'top',horizontal: 'right',}} open={open} onClose={handleClose}>
                                        <MenuItem onClick={handleClose}>{logInUserVar.user}</MenuItem>
                                        <MenuItem onClick={clickedLogOut} >Log Out</MenuItem>
                                    </Menu>
                                </div>
                    }
                    </Grid>
                </Grid>
          </Toolbar>
        </AppBar>
        <Switch>
            <Route exact path="/" component={EntryComp}/>    
            <Route path="/LogIn" component={LoginComp}/>   
            <Route path="/NewAccount" component={CreateAccountComp}/>
            <Route path="/Movies/Edit/:id" component={EditMovieComp}/>
            <Route path="/Movies" component={MoviesComp}/>
            <Route path="/Movie/:id" component={MovieComp}/>
            <Route path="/Member/:id" component={MemberComp}/>
            <Route path="/Subscriptions/Edit/:id" component={EditMemberComp}/>
            <Route path="/Subscriptions" component={SubscriptionsComp}/>
            <Route path="/UsersManagment/Edit/:id" component={EditUserComp}/>
            <Route path="/UsersManagment" component={UserManagmentComp}/>       
        </Switch>
        
        </div>
    )
}

export default MainComp;

