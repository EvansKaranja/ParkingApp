import { combineReducers } from "redux";
import parkingReducer from "./parkingReducer";
import userReducer from "./userReducer";
import adminReducer from './adminReducer'

export default combineReducers({
  parking: parkingReducer,
  user: userReducer,
  admin:adminReducer,
});
