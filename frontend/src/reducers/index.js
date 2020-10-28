import { combineReducers } from "redux";
import parkingReducer from "./parkingReducer";
import userReducer from "./userReducer";

export default combineReducers({
  parking: parkingReducer,
  user: userReducer,
});
