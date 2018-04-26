import { TabNavigator } from "react-navigation";

//import your tabs js file
import TeamList from "../container/teamList";
import FriendList from '../container/friendListLayout'
import Profile from '../container/profile'
import AddEventFriend from '../container/AddEventDetailFrind'




var myTabs = TabNavigator({
    // here you will define your screen-tabs
    TeamList: {
        screen: TeamList
    },
    FriendList: {
        screen: FriendList 
    },
    Profile: {
        screen: Profile
    },
},
    {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#FC561F',
        }
    });

export default myTabs;