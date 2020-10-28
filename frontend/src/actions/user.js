import { SIGN_IN_USER, SIGN_UP_USER, SIGN_OUT_USER, LOAD_USER,CLEAR_PARKING_INFO } from "./types";

//get user
export const getUser = () => (dispatch, getState) => {
  const token = getState().user.token;
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `TOKEN ${token}`;
  }
  axios
    .get("/user/auth/user", config)
    .then((res) => {
      dispatch({
        type: LOAD_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const signInUser = (user) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  axios
    .post("/user/auth/login", user, config)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SIGN_IN_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const signUpUser = (user) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (user.password === user.confirmPassword) {
    const data = {
      email: user.email,
      password: user.password,
      first_name: user.first_name,
      last_name: user.last_name
    }
    axios
      .post("/user/auth/register", data, config)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: SIGN_UP_USER,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  } else {
    console.log("Password didnt match")
  }
};

export const signOutUser = () => (dispatch, getState) => {
  const token = getState().user.token;
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `TOKEN ${token}`;
  }
  axios
    .post("/user/auth/logout", null, config)
    .then((res) => {
      dispatch({
        type: SIGN_OUT_USER,
      });
      dispatch({
        type:CLEAR_PARKING_INFO,
      })
    })
    .catch((err) => console.log(err));
};
