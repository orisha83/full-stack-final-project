import {useState, useEffect, useContext} from 'react'
import Typography from '@material-ui/core/Typography';
import { SubscriptionsContext } from './SubscriptionsContaxtApi'
import {MembersContext} from './MembersContextApi'
import {Link} from 'react-router-dom'


function SubscriptionsWatchedComp(props)
{
   const [subscriptions, setSubscriptions] = useContext(SubscriptionsContext);
   const [members, setMembers] = useContext(MembersContext);
   const [subscriptionAndDatesArray, setSubscriptionAndDatesArray] = useState([])

   const createSubscriptionsArray = () =>
    {
        let subscriptionAndDatesArray = []
        let subscriptionAndDatesObj = {}
        let Member = {}

        subscriptions.forEach(function(element)
        {
            element.movies.forEach(function(item)
            {
                if(item.movieId == props.movieId)
                {
                    Member = members.find(x => x._id == element.memberId)
                    if(Member)
                    {
                        subscriptionAndDatesObj = {memberId : Member._id, memberName : Member.name, date : item.dateWatched}
                        subscriptionAndDatesArray.push(subscriptionAndDatesObj)
                    }
                }
            })
        })
        setSubscriptionAndDatesArray(subscriptionAndDatesArray)
    }

   useEffect(() =>
   {
    createSubscriptionsArray()
   },[])


       return(
        <div>
          <Typography variant="h5" variantMapping="h1" gutterBottom align="center">
                        Subscriptions watched
                    </Typography>
            
            <ul>
              {
                  subscriptionAndDatesArray.map((item,index) =>{
                      return <li key={index}><Link to={`/Member/${item.memberId}`}>{item.memberName}</Link>, {item.date}</li>
                  })
              }
            </ul>
          
        </div>
    )
}

export default SubscriptionsWatchedComp;

