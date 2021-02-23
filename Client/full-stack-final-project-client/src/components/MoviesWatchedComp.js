import {useState, useEffect, useContext, useRef} from 'react'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {MoviesContext} from "./MoviesContaxtApi";
import { SubscriptionsContext } from './SubscriptionsContaxtApi'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Utils from './Utils'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220
    },
    paper: {
      padding: theme.spacing(3),
      borderColor : 'black',
      borderStyle: 'solid',
      borderWidth: '2px',
    }
  }));

function MoviesWatchedComp(props)
{
    const classes = useStyles();
    const [subscriptions, setSubscriptions] = useContext(SubscriptionsContext);
    const [moviesAndDates, setMoviesAndDates] = useState("")
    const [movies, setMovies] = useContext(MoviesContext);
    const [subscribePage, setSubscribePage] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState()
    const [filteredMovies, setFilteredMovies] = useState([])
    const [date, setDate] = useState("2015-08-09")
    const [newId, setNewId] = useState("")
    const [pressed, setPressed] = useState(false)


    const clickedSubscribeToMovie = async () =>
    {
        let newsubscriptionToSubscriptions = {}
        let newMovieToSubscriptions = {movieId : selectedMovie._id, dateWatched : date}
        let localSubscription = subscriptions
        let subscriptionsIndex = localSubscription.findIndex(x => x.memberId == props.memberId)
        if(subscriptionsIndex >= 0 )
        {
            let moviesRecoredInMemberRecored = localSubscription[subscriptionsIndex].movies
            moviesRecoredInMemberRecored.push(newMovieToSubscriptions)
            newsubscriptionToSubscriptions = {_id: localSubscription[subscriptionsIndex]._id , memberId : props.memberId, movies : moviesRecoredInMemberRecored}
            localSubscription[subscriptionsIndex] = newsubscriptionToSubscriptions
            setSubscriptions(localSubscription)
            let newsubscriptionToServer = {memberId : props.memberId, movies : moviesRecoredInMemberRecored}
            Utils.updateServer('Subscriptions', localSubscription[subscriptionsIndex]._id, newsubscriptionToServer)
        }
        else //new subscription
        {
            newsubscriptionToSubscriptions = {memberId : props.memberId, movies : [newMovieToSubscriptions]}
            let res = await Utils.sendDataToServer('Subscriptions',newsubscriptionToSubscriptions)
            setNewId(res)
        }
        setSubscribePage(false)
    }

    const initialRender = useRef(true);
    useEffect(() =>
    {
        if(initialRender.current){
            initialRender.current = false;
        }else{
                let newMovieToSubscriptions = {movieId : selectedMovie._id, dateWatched : date}
                let newsubscriptionToSubscriptions = {_id: newId , memberId : props.memberId, movies : [newMovieToSubscriptions]}
                let localSubscription = subscriptions
                localSubscription.push(newsubscriptionToSubscriptions)
                setSubscriptions(localSubscription)
                setPressed(true)
            }
    },[newId])

    const ClickedToClose = () =>
    {
        setSubscribePage(false)
    }

    const clickedSubscribe = () =>
    {
        setSubscribePage(true)
        let filteredMoviesTemp = movies.filter(x => x.name != moviesAndDates.movieName)
        setFilteredMovies(filteredMoviesTemp)
    }

    const selectChanged = (e) =>
    {
        setSelectedMovie(e.target.value);
    }

    const createMoviesAndDatesArray = () =>
    {
        let moviesAndDatesArray = []
        let subscriptionsForMemberTemp = subscriptions.find(x => x.memberId == props.memberId)
        if(subscriptionsForMemberTemp) //adds to current subscription
        {
            let moviesAndDatesWithId = subscriptionsForMemberTemp.movies
            moviesAndDatesWithId.forEach(x => {
            let watchedMovies = movies.find(item => item._id == x.movieId)
            if(watchedMovies)
            {
                let MovieAndDateObj = {movieId : watchedMovies._id, movieName : watchedMovies.name , date : x.dateWatched}
                moviesAndDatesArray.push(MovieAndDateObj)
            }
            })
            
        }
        setMoviesAndDates(moviesAndDatesArray)
    }

    useEffect(() =>
    {
        createMoviesAndDatesArray()
    },[])

    useEffect(() =>
    {
        createMoviesAndDatesArray()
    },[subscribePage, props])

       return(
        <div>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h6" gutterBottom align="center">
                        Movies Watched
                    </Typography>
                </Grid>
                <Grid item>
                   {subscribePage 
                    ? <Button style={{textTransform: 'none'}} variant="contained" onClick={ClickedToClose}>Close</Button>
                    : <Button style={{textTransform: 'none'}} variant="contained" onClick={clickedSubscribe}>Subscribe to a new movie</Button>
                    }
                </Grid>
                {subscribePage && <div className={classes.paper}><Grid item>Add a New Movie </Grid>
                                        <Grid item container direction="row">
                                            <Grid item>
                                                <FormControl  className={classes.formControl}>
                                                    <InputLabel>Select a Movie</InputLabel>
                                                    <Select onChange={selectChanged}>
                                                        {
                                                            filteredMovies.map((item,index) => {
                                                                return <MenuItem key={index} value={item}>{item.name}</MenuItem>
                                                            })
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item>
                                                <input style={{width:"150px", height:"50px" }} type="date" data-date="" data-date-format="DD/MM/YYYY" value={date} onChange={e =>setDate(e.target.value) }/>
                                            </Grid>
                                        </Grid>
                                        <Grid item><Button style={{textTransform: 'none'}} variant="contained" onClick={clickedSubscribeToMovie}>Subscribe</Button></Grid>
                                </div>
                }
                <Grid item container direction="column">
                <ul>
                {
                 moviesAndDates && moviesAndDates.map((item,index) =>{
                    return <Grid item><li key={index}><Link to={`/Movie/${item.movieId}`}>{item.movieName}</Link>, {item.date}</li></Grid>
                    })
                }
                </ul>
                </Grid>
            </Grid>
        </div>
    )
}

export default MoviesWatchedComp;

