import {useState, useContext, useEffect, useRef} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import FormGroup from '@material-ui/core/FormGroup';
import {MoviesContext} from "./MoviesContaxtApi";
import Utils from './Utils'


const AddMovieComp = (params) =>
{
    const [title, setTitle] = useState("")
    const [genres, setGenres] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [premiered, setPremiered] = useState()
    const [movies, setMovies] = useContext(MoviesContext);
    const [newId, setNewId] = useState(0)
    const [pressed, setPressed] = useState(false)

    const clickedSave = async () =>
    {
        let genresArry = genres.split(" ")
        let moviesObj = {name : title, premiered : premiered, image : imageUrl, genres : genresArry}
        let res = await Utils.sendDataToServer('Movies', moviesObj)
        setNewId(res)
        params.clickedAllMovies()
    }

    const initialRender = useRef(true);
    useEffect(() =>
    {
        if(initialRender.current){
            initialRender.current = false;
        }else{
                let genresArry = genres.split(" ")
                let moviesObjtoMovies = {_id : newId ,name : title, premiered : premiered, image : imageUrl, genres : genresArry}
                let currentMoviesArray = movies
                currentMoviesArray.push(moviesObjtoMovies)
                setMovies(currentMoviesArray)
                setPressed(true)
            }
    },[newId])

    return(
        <div>
            <br/>
            <FormGroup>
                Name :  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<TextField required label="Required" variant="outlined" size="small" onChange={e =>setTitle(e.target.value)}/><br/>
                Genres : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<TextField variant="outlined" size="small" onChange={e =>setGenres(e.target.value)}/><br/>
                Image URL : <TextField variant="outlined" size="small" onChange={e =>setImageUrl(e.target.value)}/><br/>
                Premiered : &nbsp;&nbsp;&nbsp;<TextField variant="outlined" size="small" onChange={e =>setPremiered(e.target.value)}/>
            </FormGroup><br/><br/>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button style={{textTransform: 'none'}} startIcon={<SaveIcon />} size="large" variant="contained" onClick={clickedSave}></Button>  
            <Button style={{textTransform: 'none'}} startIcon={<CancelIcon />} variant="contained" size="large" onClick={() => params.clickedAllMovies()}></Button>

        </div>
    )
}

export default AddMovieComp;

