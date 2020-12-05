import { ADMINISTRATION } from "./types";

export const adminstration = () => (dispatch,getState) => {
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
      .get("/parking/parking/administration/",config)
      .then((res) => {
        dispatch({
          type: ADMINISTRATION,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));}
  };