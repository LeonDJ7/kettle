import { Switch, Route } from 'react-router';
import Item from './components/item pages/Item';
import Search from './components/search items/Search';
import Request from './components/request item/Request';
import Discover from './components/discover/Discover';
import UserProfile from './components/user profile/UserProfile';
import AuthForm from './components/user profile/AuthForm';

const Main = (props) => {

    return (
        <Switch>
            <Route exact path='/' component={Search} />
            <Route exact path='/art/:id' component={Item} />
            <Route exact path='/request' component={Request} />
            <Route exact path='/discover' component={Discover} />
            <Route exact path='/user_profile' component={UserProfile} />
        </Switch>
        
    )
}

export default Main