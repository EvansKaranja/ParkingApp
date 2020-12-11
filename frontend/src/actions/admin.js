import { ADMINISTRATION, MAKESTAFF } from "./types";

export const adminstration = (data) => (dispatch,getState) => {
    const token = getState().user.token;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (token) {
      config.headers["Authorization"] = `TOKEN ${token}`;
    }
    if(window.location.href==="http://127.0.0.1:8000/#/admin"){
    axios
      .post("/parking/parking/administration/",data,config)
      .then((res) => {
        dispatch({
          type: ADMINISTRATION,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));}
  };


  export const makeUserStaff = (data) => (dispatch,getState) => {
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
      .post("/parking/parking/usertostaff/",data,config)
      .then((res) => {
        dispatch({
          type: MAKESTAFF,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));
  };