import {useState, useContext, useRef, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import FormGroup from '@material-ui/core/FormGroup';
import {MembersContext} from './MembersContextApi'
import Utils from './Utils'

function AddMemberComp(params)
{
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [members, setMembers] = useContext(MembersContext);
    const [newId, setNewId] = useState(0)
    const [pressed, setPressed] = useState(false)

    const clickedSave = async () =>
    {
        let MemberObj = {name : name, email : email, city : city}
        let res = await Utils.sendDataToServer('Members', MemberObj)
        setNewId(res)
        params.clickedAllMembers()
    }

    const initialRender = useRef(true);
    useEffect(() =>
    {
        if(initialRender.current){
            initialRender.current = false;
        }else{
                let MemberObjToMembers = {_id : newId , name : name, email : email, city : city}
                let currentMembersArray = members
                currentMembersArray.push(MemberObjToMembers)
                setMembers(currentMembersArray)
                setPressed(true)
            }
    },[newId])
   
       return(
        <div>
            <br/>
            <FormGroup>
           Name :  <TextField required label="Required" variant="outlined" size="small" onChange={e =>setName(e.target.value)}/><br/>
           Email : &nbsp;<TextField required label="Required" variant="outlined" size="small" onChange={e =>setEmail(e.target.value)}/><br/>
           City  : &nbsp;&nbsp;&nbsp;<TextField required label="Required" variant="outlined" size="small" onChange={e =>setCity(e.target.value)}/><br/>
           </FormGroup>
           <br/>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button style={{textTransform: 'none'}} startIcon={<SaveIcon />} variant="contained" size="large" onClick={clickedSave}></Button> 
            <Button style={{textTransform: 'none'}} startIcon={<CancelIcon />} variant="contained" size="large" onClick={() => params.clickedAllMembers()}></Button> 
        </div>
    )
}

export default AddMemberComp;

