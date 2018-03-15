import { StackNavigator } from 'react-navigation';
import SingleLogin from '../container/singleLogin'
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

import DetailRegister from '../component/items/detailRegister'

// import ListShirt from '../component/list/listShirt/listShirt'

export default StackNavigator ({
    SingleLogin : {
        screen : SingleLogin,
        navigationOptions : {
            header : () => null
        }
    },
    Login : {
        screen : Login,
        navigationOptions : {
            header : () => null
        }
    },
    Register : {
        screen : Register,
    },
    // Test : {
    //     screen : Test
    // },
    ListEvent : {
        screen : ListEvent,
    },
    ShirtPhotoPlus : {
        screen : ShirtPhotoPlus
    },
    RegisterDistance : {
        screen : RegisterDistance,
    },
    TabRouter : {
        screen : TabRouter
    },
    TeamList : {
        screen : TeamList
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