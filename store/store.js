import { createStore, combineReducers } from 'redux';

const eventState = {
    name: "1",
    date: "date",
    distanceEvent : {
        distanceName:"",
        distance :"",
        price: ""
    }
}
const event = (state = eventState, action) => {
    switch (action.type) {
        case 'addEvent': {
            state.name = action.payload
            break;
        }
        case 'addEventDate': {
            state.date = action.payload
            break;
        }
        case 'addDistance' : {
            state.distanceEvent = action.payload
            break;
        }

    }
    return state
}

const shirtphoto = (state = {}, action) => {
    switch (action.type) {
        case 'setPrice': {
            state.price = action.payload
            break;
        }
        case 'setSizeShirt': {
            state.size = action.payload
            break;
        }
        default:
    }
    return state
}
const photoplus = (state = { title: "Photo Plus Service", pricePhoto: 100 }, action) => {
    switch (action.type) {
        case 'onPhotoPlus':
            state = {
                ...state,
                title: action.payload,
                pricePhoto: action.payload
            }
            break;
        default:
    }
    return state
}
const creditcard = (state = {}, action) => {
    switch (action.type) {
        case 'setNameCredit': {
            state.nameCredit = action.payload
            break;
        }
        case 'setNumberCredit': {
            state.numberCredit = action.payload
            break;
        }
        case 'setExpCredit': {
            state.expCredit = action.payload
        }
        case 'setCVC': {
            state.cvcCredit = action.payload
        }
        default:
            break;
    }
    return state
}
const choiceSend = (state = {}, action) => {
    switch (action.type) {
        case 'setSendChoice': {
            state.choiceSend = action.payload
            break;
        }
    }
    return state
}
const address = (state = {}, action) => {
    switch (action.type) {
        case 'setUser': {
            state.user = action.payload
            break;
        }
    }
    return state
}

const store = createStore(combineReducers({ event, shirtphoto, creditcard, photoplus, choiceSend, address }))
store.subscribe(() => {
    console.log("Updata Store", store.getState())
})


export default store