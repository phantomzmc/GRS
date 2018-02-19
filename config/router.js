import { StackNavigator } from 'react-navigation';
import Login from '../container/login'
import ListEvent from '../component/list/listevent/listevent'
import RegisterDistance from '../container/registerDistance'
import ShirtPhotoPlus from '../container/shirtphotoplus'
import CreditPayment from '../container/creditPayment'
import AddressLayout from '../container/addressLayout'
import TotalPayment from '../container/totalLayout'
import Register from '../container/userRegister'
import TeamList from '../container/teamList'
import TabRouter from '../config/tabrouter'
import AddEventFriend from '../container/AddEventDetailFrind'
import TransferPayment from '../container/tranferPayment'

import ListDistance from '../component/list/event/listdistance'
import ListShith from '../component/list/listShirt/listShirt';

// import ListShirt from '../component/list/listShirt/listShirt'

export default StackNavigator ({
    
    // RegisterDistance : {
    //     screen : RegisterDistance,
    // },
    // Login : {
    //     screen : Login,
    //     navigationOptions : {
    //         header : () => null
    //     }
    // },
    // Register : {
    //     screen : Register,
    // },
    ListEvent : {
        screen : ListEvent,
    },
    TabRouter : {
        screen : TabRouter
    },
    TeamList : {
        screen : TeamList
    },
    ShirtPhotoPlus : {
        screen : ShirtPhotoPlus
    },
    CreditPayment : {
        screen : CreditPayment
    },
    TransferPayment : {
        screen : TransferPayment
    },
    AddressLayout : {
        screen : AddressLayout
    },
    TotalPayment : {
        screen : TotalPayment
    },
    AddEventFriend : {
        screen : AddEventFriend
    }


});