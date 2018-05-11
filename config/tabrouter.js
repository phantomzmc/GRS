import { TabNavigator, tabBarIcon } from "react-navigation";

//import your tabs js file
import TeamList from "../container/teamList";
import FriendList from '../container/friendListLayout'
import Profile from '../container/profile'
import AddEventFriend from '../container/AddEventDetailFrind'
import HistoryContainer from '../container/historyContainer'

var myTabs = TabNavigator({
    // here you will define your screen-tabs
    TeamList: {
        screen: TeamList,
        navigationOptions: {
            title: 'ลงทะเบียนแบบกลุ่ม',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff',
                fontFamily: "Kanit",
                fontWeight: '500',
            },
        }
    },
    FriendList: {
        screen: FriendList,
        navigationOptions: {
            title: 'รายชื่อเพื่อน',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff',
                fontFamily: "Kanit",
                fontWeight: '500',
            }
        }
    },
    HistoryContainer : {
        screen : HistoryContainer,
        navigationOptions: {
            title: 'ประวัติการวิ่ง',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff',
                fontFamily: "Kanit",
                fontWeight: '500',
            }
        }
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