import { StackNavigator } from 'react-navigation';
import SingleLogin from '../container/singleLogin'
import Login from '../container/login'
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

import DiscountCoupon from '../component/form/couponForm'
import GetPleace from '../component/items/getPlece'
import DetailRegister from '../component/items/detailRegister'
import UserHelpRegister from '../container/userHelpRegister'
import UserAddressRegister from '../container/userAddressRegister'

import ControlDistance from '../container/controlDistance'
import ButtonChangePayment from '../component/items/bottonChangePayment'
import SummaryTotal from '../component/items/summary'
import Verify from '../container/verify'
import ResetVerify from '../container/resetVerify'
import ResetPassword from '../container/resetPassword'
import MultiSelectExample from '../mockdata'

import FriendDistance from '../container/friendDistance'
import HistoryList from '../component/list/history/historylist'


export default StackNavigator({
    // HistoryList : {
    //     screen : HistoryList
    // },
    // TabRouter: {
    //     screen: TabRouter
    // },
    EventList: {
        screen: EventList,
        navigationOptions: {
            title: 'รายการวิ่ง',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff',
                fontFamily: "Kanit",
                fontWeight: '500'
            }
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            title: "สมัครสมาชิก",
            headerStyle: {
                backgroundColor: "#FC561F"
            },
            headerTitleStyle: {
                color: "#fff"
            }
        }
    },
    SingleLogin: {
        screen: SingleLogin,
        navigationOptions: {
            header: () => null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: () => null
        }
    },
    UserAddressRegister: {
        screen: UserAddressRegister,
        navigationOptions: {
            title: "สมัครสมาชิก",
            headerStyle: {
                backgroundColor: "#FC561F"
            },
            headerTitleStyle: {
                color: "#fff"
            }
        }
    },
    UserHelpRegister: {
        screen: UserHelpRegister,
        navigationOptions: {
            title: "สมัครสมาชิก",
            headerStyle: {
                backgroundColor: "#FC561F"
            },
            headerTitleStyle: {
                color: "#fff"
            }
        }

    },
    Verify: {
        screen: Verify,
        navigationOptions: {
            title: "ยืนยันตัวตน",
            headerStyle: {
                backgroundColor: "#FC561F"
            },
            headerTitleStyle: {
                color: "#fff"
            }
        }
    },
    ResetVerify: {
        screen: ResetVerify,
        navigationOptions: {
            title: "ขอรหัสผ่านใหม่",
            headerStyle: {
                backgroundColor: "#FC561F"
            },
            headerTitleStyle: {
                color: "#fff"
            }
        }
    },
    ResetPassword: {
        screen: ResetPassword,
        navigationOptions: {
            title: "ขอรหัสผ่านใหม่",
            headerStyle: {
                backgroundColor: "#FC561F"
            },
            headerTitleStyle: {
                color: "#fff"
            }
        }
    },
    ShirtPhotoPlus: {
        screen: ShirtPhotoPlus,
        navigationOptions: {
            title: 'เลือกไซค์เสื้อ',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff',
                fontFamily: 'kanit',
            }
        }
    },
    DiscountCoupon: {
        screen: DiscountCoupon,
        navigationOptions: {
            title: 'คูปองส่วนลด',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff'
            }
        }
    },
    ControlDistance: {
        screen: ControlDistance,
        navigationOptions: {
            title: 'ลงทะเบียนวิ่ง',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff',
                fontFamily: 'kanit',
            },
        }
    },
    ButtonChangePayment: {
        screen: ButtonChangePayment,
        navigationOptions: {
            title: 'ชำระเงิน',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff',
                fontFamily: 'kanit',
            },
        }
    },
    TabRouter: {
        screen: TabRouter
    },
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

    CreditPayment: {
        screen: CreditPayment
    },
    TransferPayment: {
        screen: TransferPayment
    },
    AddressLayout: {
        screen: AddressLayout,
        navigationOptions: {
            title: 'การจัดส่ง',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff',
                fontFamily: 'kanit',
            },
        }
    },
    TotalPayment: {
        screen: TotalPayment,
        navigationOptions: {
            title: 'สรุปการสมัครทั้งหมด',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff',
                fontFamily: 'kanit',
            }
        }
    },
    AddEventFriend: {
        screen: AddEventFriend,
        navigationOptions: {
            title: 'เลือกระยะทางเเละเสื้อ',
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
    FriendDistance : {
        screen : FriendDistance,
        navigationOptions: {
            title: 'รายชื่อเพื่อน',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff',
                fontFamily: "Kanit",
                fontWeight: '500'
            }
        }
    },
    TotalRegister: {
        screen: TotalRegister
    },
    GetPleace: {
        screen: GetPleace
    }


});