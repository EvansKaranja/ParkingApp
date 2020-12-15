import {
  GET_PARKING,
  GET_PARKING_DETAILS,
  SET_USER_LOCATION,
  SET_GEOCODED_LOCATION,
  GET_PAYMENT_INFO,
  CLEAR_PARKING_INFO,
  SENDSMS

} from "../actions/types.js";
const initialState = {
  parkingSpaces: null,
  parkingDetails: "",
  location: null,
  loading: true,
  paymentInfo:null,
  parkingType:null,
  
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PARKING:
      return {
        ...state,
        parkingSpaces: action.payload
      };
    case GET_PARKING_DETAILS:
      return {
        ...state,
        parkingDetails: action.payload
      };
    case SET_USER_LOCATION:
      return {
        ...state,
        location:action.payload.location,
        parkingType:action.payload.parkingType
      };
    case SET_GEOCODED_LOCATION:
      
      return {
        ...state,
        location:action.payload.location,
        parkingType:action.payload.parkingType,
      };
 
    case GET_PAYMENT_INFO:
      localStorage.setItem("paymentInfo", JSON.stringify(action.payload));
      return {
        ...state,
        loading: false,
        paymentInfo:action.payload
      };
    case CLEAR_PARKING_INFO:
      console.log("clearing")
      // localStorage.removeItem("paymentInfo");
        return {
          ...state,
          parkingSpaces: null,
          parkingDetails: "",
          location: null,
          loading: true,
          paymentInfo:null
        };
      case SENDSMS:
          return {
              ...state,
            };
    default:
      return state;
  }
}
