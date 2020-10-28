import {
  GET_PARKING,
  GET_PARKING_DETAILS,
  SET_USER_LOCATION,
  SET_GEOCODED_LOCATION,
  GET_PAYMENT_INFO,
  CLEAR_PARKING_INFO

} from "../actions/types.js";
const initialState = {
  parkingSpaces: null,
  parkingDetails: "",
  location: null,
  loading: true,
  paymentInfo:null,
  
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
      console.log("hello")
      return {
        ...state,
        location: action.payload
      };
    case SET_GEOCODED_LOCATION:
      console.log(action.payload)
      return {
        ...state,
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
    default:
      return state;
  }
}
