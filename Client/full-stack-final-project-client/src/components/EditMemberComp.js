import {useState, useEffect, useContext} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'
import CancelIcon from '@material-ui/icons/Cancel';
import UpdateIcon from '@material-ui/icons/Update';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {MembersContext} from './MembersContextApi'
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


function EditMemberComp(props)
{
    const classes = useStyles()
    const [members, setMembers] = useContext(MembersContext);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [editMember, setEditMember] = useState("")

    const clickedUpdate = () =>
    {
        let MemberObjToMembers = {_id : props.match.params.id , name : name, email : email, city : city}
        let MemberObjToServer = {name : name, email : email, city : city}
        let MembersArray = members
        let MemberIndex = members.findIndex(x => x._id == MemberObjToMembers._id )
        if(MemberIndex >= 0 )
        {
          MembersArray[MemberIndex] = MemberObjToMembers
          setMembers(MembersArray)
          Utils.updateServer('Members', MemberObjToMembers._id, MemberObjToServer)
        }
    }

    const form = () => 
    {
      let memberIndex = members.findIndex(x => x._id == props.match.params.id )
      if(memberIndex >= 0 )
      {
        setEditMember(members[memberIndex])
        setName(members[memberIndex].name)
        setEmail(members[memberIndex].email)
        setCity(members[memberIndex].city)
      }     
    }

    useEffect(() => {
      form()
    },[])
   
       return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <FormGroup className={classes.paper}>   
                    <h3>Edit Member : {name}</h3>
                    Name :  <TextField variant="outlined" placeholder={name} onChange={e =>setName(e.target.value)}/><br/>
                    Email : &nbsp;<TextField variant="outlined" placeholder={email} onChange={e =>setEmail(e.target.value)}/><br/>
                    City : &nbsp;&nbsp;&nbsp;<TextField variant="outlined" placeholder={city} onChange={e =>setCity(e.target.value)}/><br/>
                  <br/>
                    <FormGroup row>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link style={{ textDecoration: 'none' }} to="/Subscriptions"><Button style={{textTransform: 'none'}} startIcon={<UpdateIcon />} variant="contained" size='large' onClick={clickedUpdate}></Button></Link> 
                        <Link style={{ textDecoration: 'none' }} to="/Subscriptions"><Button style={{textTransform: 'none'}} startIcon={<CancelIcon />} variant="contained" size='large'></Button></Link>
                    </FormGroup>
                </FormGroup>
            </Grid>
        </div>
    )
}

export default EditMemberComp;

