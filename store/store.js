import { createStore, combineReducers } from 'redux';


const shirtphoto = (state = { size: "M", price: 300 }, action) => {
    switch (action.type) {
        case 'setPrice':
            state = {
                ...state,
                size: action.payload,
                price: action.payload

            }
            break;

        default:
    }
    return state
}
const photoplus = (state = {title: "Photo Plus Service" , pricePhoto: 100 }, action) => {
    switch (action.type) {
        case 'onPhotoPlus':
            state = {
                ...state,
                title : action.payload,
                pricePhoto : action.payload
            }
            break;
        default:
    }
    return state
}
const creditcard = (state = { number: "", priceCredit: 300 }, action) => {
    switch (action.type) {
        case 'setPriceCredit':
            state = {
                ...state,
                number : action.payload,
                priceCredit : action.payload
            }
            break;
    
        default:
            break;
    }
    return state
}
const store = createStore(combineReducers({shirtphoto,creditcard,photoplus}))
store.subscribe(() => {
    console.log("Updata Store", store.getState())
})


export default store