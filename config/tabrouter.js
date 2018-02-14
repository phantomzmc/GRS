import {TabNavigator} from "react-navigation";

//import your tabs js file
import TeamList from "../container/teamList";
// import Screen2 from "./tabs/screen2";
// import Screen3 from "./tabs/screen3";

var myTabs = TabNavigator({
	// here you will define your screen-tabs
	TeamList: {
        screen:TeamList
    },
	// Shopping: {screen:Screen2},
	// Cart: {screen:Screen3}
},
{
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: 'red',
  }
  });

export default myTabs;