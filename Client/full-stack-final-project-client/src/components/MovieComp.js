import {useContext, useEffect, useState} from 'react'
import Button from '@material-ui/core/Button';
import SubscriptionWatchedComp from "./SubscriptionWatchedComp"
import {Link, useHistory} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {MoviesContext} from "./MoviesContaxtApi";
import {LogInContext} from './LogInContaxtApi'
import {UsersContext} from './UsersContaxtApi'
import Utils from './Utils'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      borderColor : 'black',
      borderStyle: 'solid',
      borderWidth: '2px',
    },
  }));

function MovieComp(props)
{
    const classes = useStyles()
    const [movies, setMovies] = useContext(MoviesContext);
    const [movie, setMovie] = useState()
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const {logInUser} = useContext(LogInContext)
    const [logInUserVar,setLogInUserVar] = logInUser
    const [users, setUsers] = useContext(UsersContext);
    const [isUsingProps, setIsUsingProps] = useState(true)
    const history = useHistory()
    

    const deleteMovie = () =>
    {
        let currentMoviesArray = movies
        let moviesArrayAfterDelete = currentMoviesArray.filter(x => x._id != movie._id)
        setMovies(moviesArrayAfterDelete)
        Utils.deleteDataFromServer("Movies", movie._id)
        if(isUsingProps == false)
        {
          history.push('/Movies')
        }
    }

    const clickedDelete = () =>
    {
        confirmAlert({
            title: 'Are you sure you want to delete the movie:',                        // Title dialog
            message: movie.name,               // Message dialog
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => deleteMovie()
                },
                {
                  label: 'No'
                }
              ]
          })
    }

    const checkWhichBottonsToShow = () =>
    {
      let currentUser = users.find(x => x.userName == logInUserVar.user)
      if(currentUser)
      {
          currentUser.permissions.forEach(item => {
          if(item == "Update Movies")
          {
            setShowEdit(true)
          }
          if(item == "Delete Movies")
          {
            setShowDelete(true)
          }
        })
      }
    }

    const loadPage = () =>
    {
      if(props.movieDetails)
        {
            setIsUsingProps(true)
            setMovie(props.movieDetails)
            setShowEdit(props.userPermissions.showEdit)
            setShowDelete(props.userPermissions.showDelete)
        }
        else if(props.match.params.id)
        {
            setIsUsingProps(false)
            let newMovie = movies.find(x => x._id == props.match.params.id)
            if(newMovie)
            {
              setMovie(newMovie)
              checkWhichBottonsToShow()
            }
        }
    }

    useEffect(() =>
    {
      loadPage()
    },[props])
    
    return(
        
            <Grid container direction="column" alignItems="center">
                <Grid item>
                    <Typography variant="h4" gutterBottom align="center">
                    {movie && movie.name} , {movie && movie.premiered.substring(0, 10)}
                    </Typography>
                    <Typography variant="h6" gutterBottom align="left">
                    Genres: {movie && movie.genres.join(", ")}
                    </Typography>
               </Grid>
                <Grid item>    
                </Grid>
                <Grid  container direction="row" justify="space-around" alignItems="flex-start" >
                    <Grid item  >
                        {movie && <img src={movie.image} width="200" height="300"/> }
                    </Grid>
                    <Grid item  className={classes.paper}>
                        {movie && <SubscriptionWatchedComp movieId={movie._id}/>}
                    </Grid>
                </Grid>
                <Grid item>
                   {movie &&  showEdit && <Link to={`/Movies/Edit/${movie._id}`} style={{ textDecoration: 'none' }}>
                        <Button style={{textTransform: 'none'}} size='large' startIcon={<EditIcon />} variant="contained"></Button></Link>}
                   {showDelete && <Button style={{textTransform: 'none'}} size='large' variant="contained" startIcon={<DeleteIcon />} onClick={clickedDelete}></Button>}
                </Grid>
            </Grid>
        
    )
}

export default MovieComp;

