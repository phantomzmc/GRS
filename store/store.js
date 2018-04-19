import { createStore, combineReducers, applyMiddleware } from "redux";

const eventState = {
  event: {
    name: "1",
    date: "date",
    tranferBank: ""
  },
  distanceEvent: {
    distanceName: "",
    distance: "1 km",
    price: 400
  }
};
const credit = {
  nameCredit: {
    nameCredit: "",
    numberCredit: "1234 5678 1234 5678",
    expCredit: "00/0000",
    cvcCredit: "XXX"
  },
  vat: 33.25
};
const user = {
  profile: {
    userid: "",
    password: ""
  }

};
const profile = (state = user, action) => {
  switch (action.type) {
    case "setProfile": {
      state.profile = action.payload;
    }
    case "setAddress": {
      state.address = action.payload;
    }
    case "setHelp": {
      state.help = action.payload;
    }
  }
  return state;
};

const event = (state = eventState, action) => {
  switch (action.type) {
    case "addEvent": {
      state.event = action.payload;
      break;
    }

    case "addDistance": {
      state.distanceEvent = action.payload;
      break;
    }
  }
  return state;
};

const shirtphoto = (state = {}, action) => {
  switch (action.type) {
    case "setPrice": {
      state.price = action.payload;
      break;
    }
    case "setSizeShirt": {
      state.size = action.payload;
      break;
    }
    default:
  }
  return state;
};
const photoplus = (
  state = {
    title: "Photo Plus Service",
    pricePhoto: 100
  },
  action
) => {
  switch (action.type) {
    case "onPhotoPlus":
      state = {
        ...state,
        title: action.payload,
        pricePhoto: action.payload
      };
      break;
    default:
  }
  return state;
};
const creditcard = (state = credit, action) => {
  switch (action.type) {
    case "setCredit": {
      state.nameCredit = action.payload;
      break;
    }
    default:
      break;
  }
  return state;
};
const choiceSend = (state = {}, action) => {
  switch (action.type) {
    case "setSendChoice": {
      state.choiceSend = action.payload;
      break;
    }
  }
  return state;
};
const address = (state = {}, action) => {
  switch (action.type) {
    case "setUser": {
      state.user = action.payload;
      break;
    }
  }
  return state;
};
const total = (state = {}, action) => {
  switch (action.type) {
    case "setTotal": {
      state.totalPrice = action.payload;
      break;
    }
  }
  return state;
};
const friend = {
  profile:
    [
      {
        name: "kiiky",
        gen: "man",
        age: "21",
        imgAvatar: "https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-0/p370x247/21557776_1425545897494291_6496115009920700297_n.jpg?oh=2b747f30ce806f5e37ae1d3cd9427cf4&oe=5B1C181C",

      },
    ],
  detailRegis: [{
    size: "",
    distance: {}
  }]

}
const friendlist = (state = friend, action) => {
  switch (action.type) {
    case "addFriend":
      return {
        ...state,
        profile: [...state.profile, action.payload]
      }
      break;
    case "addDistanceFriend":
      return {
        ...state,
        detailRegis: [...state.detailRegis.distance, action.payload]
      }
      break;
    case "addSize":
      return {
        ...state,
        detail: [...state.detailRegis.size, action.payload]
      }
      break;
  }
  return state;
}

const myLogger = store => next => action => {
  console.log("Log Action", action);
  next(action);
};

const store = createStore(
  combineReducers({
    profile,
    event,
    shirtphoto,
    creditcard,
    photoplus,
    choiceSend,
    address,
    total, friendlist
  }),
  {},
  applyMiddleware(myLogger)
);
store.subscribe(() => {
  console.log("Updata Store", store.getState());
});

export default store;
