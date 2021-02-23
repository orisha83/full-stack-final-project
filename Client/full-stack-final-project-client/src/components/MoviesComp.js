import {useState, useEffect, useContext,useRef } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MovieComp from './MovieComp'
import AddMovieComp from './AddMovieComp'
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { MoviesContext } from "./MoviesContaxtApi";
import {LogInContext} from './LogInContaxtApi'
import {UsersContext} from './UsersContaxtApi'

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

function MoviesComp()
{
    const [allMoviesButtonColor,setAllMoviesButtonColor] = useState("primary")
    const classes = useStyles()
    const [useSearch, setUseSearch] = useState(true)
    const [addMoviesButtonColor,setAddMoviesButtonColor] = useState("")
    const [searchWord, setSearchWord] = useState("")
    const [movies, setMovies] = useContext(MoviesContext);
    const [allMoviesPage, setAllMoviesPage] = useState(true)
    const [addMoviesPage, setAddMoviesPage] = useState(false)
    const [filteredMovies, setFilteredMovies] = useState()
    const {logInUser} = useContext(LogInContext)
    const [logInUserVar,setLogInUserVar] = logInUser
    const [users, setUsers] = useContext(UsersContext);
    const [permissionsObj, setPermissionsObj] = useState()
    const [showViewParam, setShowViewParam] = useState(false)
    const [showCreateParam, setShowCreateParam] = useState(false)
    const [pressed, setPressed] = useState(false)
    const [pressed2, setPressed2] = useState(false)

    const checkWhichBottonsToShow = () =>
    {
      let currentUser = users.find(x => x.userName == logInUserVar.user)
      if(currentUser)
      {
        let showEditParam = false
        let showDeleteParam = false
        currentUser.permissions.forEach(item => {
          if(item == "Update Movie")
          {
            showEditParam = true
          }
          if(item == "Delete Movie")
          {
            showDeleteParam = true
          }
          if(item == "View Movies")
          {
            setShowViewParam(true)
          }
          if(item == "Create Movie")
          {
            setShowCreateParam(true)
          }
        })
        setPermissionsObj({showEdit : showEditParam, showDelete : showDeleteParam})
      }
    }

    useEffect(() => 
    {
      setFilteredMovies(movies)
        checkWhichBottonsToShow()
    },[])

    const initialRender = useRef(true);
    useEffect(() =>  {
    if(initialRender.current)
    {
      initialRender.current = false;
    }
    else
    {
      let filteredMoviesArray
        if(searchWord != "")
        {
          filteredMoviesArray = movies.filter(x => x.name.toUpperCase().startsWith(searchWord))
        }
        else
        {
          filteredMoviesArray = movies
        }
        setFilteredMovies(filteredMoviesArray)
      setPressed(true)
    }
    },[searchWord, movies])

    const clickedAllMovies = () => 
    {
        setSearchWord("")
        setAddMoviesButtonColor("")
        setAllMoviesButtonColor("primary")
        setUseSearch(true)
        setAllMoviesPage(true)
        setAddMoviesPage(false)
        setFilteredMovies(movies)
    }

    const clickedAddMovies = () => 
    {
        setAllMoviesButtonColor("")
        setAddMoviesButtonColor("primary")
        setUseSearch(false)
        setAllMoviesPage(false)
        setAddMoviesPage(true)
    }

       return(
           
        <div>
            <Grid container direction="column" alignItems="center">
                <Grid item>
                <Typography variant="h5" gutterBottom align="center">
                Movies
                    </Typography>
                   
                </Grid>
                <Grid item container direction="row" justify="center">
                    <Grid item>
                        <Button style={{textTransform: 'none'}} variant="contained" color={allMoviesButtonColor} onClick={clickedAllMovies}>All Movies</Button>
                    </Grid>
                    <Grid item>
                        {showCreateParam && <Button style={{textTransform: 'none'}} variant="contained" color={addMoviesButtonColor} onClick={clickedAddMovies}>Add Movie</Button>}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Grid>
                    <Grid item>
                   {useSearch ? <label><TextField placeholder="e.g., Titanic" value={searchWord} onChange={e => setSearchWord(e.target.value.toUpperCase())} InputProps={{endAdornment: (<InputAdornment position="end"><IconButton><SearchIcon /></IconButton></InputAdornment>)}}
                            variant="outlined" style={{width: 205}} size="small"/><br/></label> : ""}
                    </Grid>
                </Grid>
                <Grid item container direction="column" alignItems="center">
                    {showViewParam ? "" : <div>You Don't Have "View Movies" Permissions!</div>}
                    {allMoviesPage && showViewParam && filteredMovies && filteredMovies.map((item,index) => {return <div key={index}><Grid item key={index} className={classes.paper}><MovieComp movieDetails={item} userPermissions={permissionsObj}/></Grid><br/></div>})}
                    {addMoviesPage && <div className={classes.paper}><AddMovieComp  clickedAllMovies={clickedAllMovies}/></div>}
                </Grid> 
           </Grid>
        </div>    )
}

export default MoviesComp;

