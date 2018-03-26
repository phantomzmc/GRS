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
import TotalRegister from '../component/items/totalRegister'
import EventList from '../container/ListEvent'
import ListDistance from '../component/list/event/listdistance'
import ListShith from '../component/list/listShirt/listShirt';
import DiscountCoupon from '../component/form/couponForm'

import DetailRegister from '../component/items/detailRegister'
import UserHelpRegister from '../container/userHelpRegister'
import UserAddressRegister from '../container/userAddressRegister'

// import ListShirt from '../component/list/listShirt/listShirt'
import Test from '../list'

export default StackNavigator ({
    // RegisterDistance : {
    //     screen : RegisterDistance,
    // },
    EventList : {
        screen : EventList
    },
    Register : {
        screen : Register
    },
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
    UserAddressRegister : {
        screen : UserAddressRegister
    },
    UserHelpRegister : {
        screen : UserHelpRegister
    },
    ListEvent : {
        screen : ListEvent,
    },
    ShirtPhotoPlus : {
        screen : ShirtPhotoPlus
    },
    DiscountCoupon : {
        screen : DiscountCoupon
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
    },
    TotalRegister : {
        screen : TotalRegister
    }


});