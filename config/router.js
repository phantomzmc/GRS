import { StackNavigator } from 'react-navigation';
import Login from '../component/login/login'
import ListEvent from '../component/list/listevent/listevent'
import RegisterDistance from '../component/register/registerDistance'
import ShirtPhotoPlus from '../component/layout/shirtphotoplus'
import CreditPayment from '../component/layout/creditPayment'
import AddressLayout from '../component/layout/addressLayout'
import TotalPayment from '../component/layout/totalLayout'
import Register from '../component/register/userRegister'

export default StackNavigator ({
    // RegisterDistance : {
    //     screen : RegisterDistance,
    // },
    Login : {
        screen : Login,
        navigationOptions : {
            header : () => null
        }
    },
    Register : {
        screen : Register,
    },
    ListEvent : {
        screen : ListEvent,
    },
    ShirtPhotoPlus : {
        screen : ShirtPhotoPlus
    },
    CreditPayment : {
        screen : CreditPayment
    },
    AddressLayout : {
        screen : AddressLayout
    },
    TotalPayment : {
        screen : TotalPayment
    },


});