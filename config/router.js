import { Stacknavigator, StackNavigator } from 'react-navigation';
import Login from '../component/login/login'
import ListEvent from '../component/list/listevent/listevent'

export default StackNavigator ({
    Login : {
        screen : Login,
        navigationOptions : {
            header : () => null
        }
    },
    ListEvent : {
        screen : ListEvent,
        navigationOptions :{
            headerTitle : "รายการวิ่ง",
            headerColor : 'red'
        }
    }

});