import {
  SIGN_OUT_USER,
  SIGN_IN_USER,
  SIGN_UP_USER,
  LOAD_USER,
} from "../actions/types";
const initialState = {
  token: sessionStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_USER:
      sessionStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload,
      };
    case SIGN_UP_USER:
      sessionStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case SIGN_OUT_USER:
      sessionStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        isLoading: false,
      };
    default:
      return state;
  }
}
