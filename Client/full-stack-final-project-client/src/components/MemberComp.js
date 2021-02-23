import {useState, useEffect, useContext} from 'react'
import Button from '@material-ui/core/Button';
import MoviesWatchedComp from './MoviesWatchedComp'
import {Link, useHistory} from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {MembersContext} from './MembersContextApi'
import {LogInContext} from './LogInContaxtApi'
import {UsersContext} from './UsersContaxtApi'
import Utils from './Utils'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      borderColor : 'black',
      borderStyle: 'solid',
      borderWidth: '2px',
    },
  }));


function MemberComp(props)
{
    const [members, setMembers] = useContext(MembersContext);
    const classes = useStyles()
    const [member, setMember] = useState()
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const {logInUser} = useContext(LogInContext)
    const [logInUserVar,setLogInUserVar] = logInUser
    const [users, setUsers] = useContext(UsersContext);
    const [isUsingProps, setIsUsingProps] = useState(true)
    const history = useHistory()

   const deleteMember = () =>
    {
        let currentMembersArray = members
        let MembersArrayAfterDelete = currentMembersArray.filter(x => x._id != member._id)
        setMembers(MembersArrayAfterDelete)
        Utils.deleteDataFromServer("Members", member._id)
        if(isUsingProps == false)
        {
          history.push('/Subscriptions')
        }
    }

   const clickedDelete = () =>
    {
        confirmAlert({
            title: 'Are you sure you want to delete Member:',  // Title dialog
            message: member.name,               // Message dialog
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => deleteMember()
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
          if(item == "Update Movie")
          {
            setShowEdit(true)
          }
          if(item == "Delete Movie")
          {
            setShowDelete(true)
          }
        })
      }
    }

    const loadPage = () =>
    {
        if(props.memberDetails)
        {
            setIsUsingProps(true)
            setMember(props.memberDetails)
            setShowEdit(props.userPermissions.showEdit)
            setShowDelete(props.userPermissions.showDelete)
        }
        else if(props.match.params.id)
        {
            setIsUsingProps(false)
            let newMember = members.find(x => x._id == props.match.params.id)
            if(newMember)
            {
                setMember(newMember)
                checkWhichBottonsToShow()
            }
        }
    }

    useEffect(() =>
    {
      loadPage()
    },[props])

       return(
       
            <Grid container direction="column" alignItems="center" >
                <Grid item>
                    <Typography variant="h5" gutterBottom align="center">
                        {member && member.name}<br/>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6" gutterBottom align="left">
                        Email : {member && member.email}<br/>
                        City : {member && member.city}
                    </Typography>
                </Grid>
                <Grid item container direction="row" justify="center">
                    <Grid item>
                    {member && showEdit && <Link to={`/Subscriptions/Edit/${member._id}`} style={{ textDecoration: 'none' }}><Button style={{textTransform: 'none'}} startIcon={<EditIcon />} size="large" variant="contained"></Button></Link>}
                    </Grid>
                    <Grid item>
                    {showDelete &&  <Button style={{textTransform: 'none'}} variant="contained" size="large" startIcon={<DeleteIcon />} onClick={clickedDelete}></Button> }
                    </Grid>
                </Grid>
                <br/>
                <Grid item className={classes.paper}>
                    {member && <MoviesWatchedComp memberId={member._id}/>}
                </Grid>
                <br/>
            </Grid>
       
    )
}

export default MemberComp;

