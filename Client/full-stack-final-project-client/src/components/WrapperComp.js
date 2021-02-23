import { MoviesContextProvider } from "./MoviesContaxtApi"
import { MembersContextProvider } from './MembersContextApi'
import { UsersContextProvider } from './UsersContaxtApi'
import { SubscriptionsContextProvider } from './SubscriptionsContaxtApi'
import { LogInContextProvider } from './LogInContaxtApi'
import Typography from '@material-ui/core/Typography';
import MainComp from './MainComp'

function WrapperComp()
{
       return(
        <div>
             <Typography variant="h3" gutterBottom align="center">
                Movies - Subscription Web Site
            </Typography>
            
            <LogInContextProvider>
            <SubscriptionsContextProvider>
            <UsersContextProvider>
            <MembersContextProvider>
            <MoviesContextProvider>
                <MainComp />
            </MoviesContextProvider>
            </MembersContextProvider>
            </UsersContextProvider>
            </SubscriptionsContextProvider>
            </LogInContextProvider>
        </div>
    )
}

export default WrapperComp;

