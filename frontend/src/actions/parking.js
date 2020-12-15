import {
  GET_PARKING, GET_PARKING_DETAILS,
  SET_USER_LOCATION, SET_GEOCODED_LOCATION, GET_PAYMENT_INFO,CLEAR_PARKING_INFO, SENDSMS
} from "./types";

//get userlocation
export const getUserLocation = (parkingType) => (dispatch) => {
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition((position) => {
      
      let lat = position.coords.latitude
      let lng = position.coords.longitude
      let payload={location:[lat,lng],parkingType}
      console.log(lat)
      dispatch({
        type: SET_USER_LOCATION,
        payload: payload,
      });
    })}



};
// Geocode location
export const geocodeUserLocation = (data) => (dispatch,getState) => {
    axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${data.name}Nairobi&key=AIzaSyAwVrZUHAURPi6Drm6M9nnpiiqBvt6E8jc`
          )
        .then((res) => {
            let lat = res.data.results[0].geometry.location.lat
            let lng = res.data.results[0].geometry.location.lng
            let parkingType = data.params
            let payload={location:[lat,lng],parkingType}
            console.log(payload)
            dispatch({
              type: SET_GEOCODED_LOCATION,
              payload: payload,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
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
        type: SET_GEOCODED_LOCATION,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
}


export const getParkingSpaces = (data) => (dispatch,getState) => {
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
    .post("/parking/parking/",data,config)
    .then((res) => {
      dispatch({
        type: GET_PARKING,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};
//getParkingDetails
export const getParkingDetails = (data) => (dispatch) => {
  dispatch({
    type: GET_PARKING_DETAILS,
    payload: data,
  });
};
//calculate amount to pay
export const getAmount = (vehicleType, Duration) => {
  switch (vehicleType) {
    case "PICKUP":
      return Math.ceil(0.6 * Duration);
    case "NISSAN":
      return Math.ceil(0.7 * Duration);
    case "MOTORBIKE":
      return Math.ceil(0.3 * Duration);
    case "TUKTUK":
      return Math.ceil(0.4 * Duration);
    case "CANTER":
      return Math.ceil(0.65 * Duration);
    case "LORRY":
      return Math.ceil(0.7 * Duration);
    case "TAXI":
      return Math.ceil(0.5 * Duration);
    case "MINIBUS":
      return Math.ceil(0.65 * Duration);
    case "TRAILER":
      return Math.ceil(0.8 * Duration);
    default:
      return Math.ceil(0.7 * Duration);
  }
};
//format mpesa mobile number
export const formatmobileNumber = (mobileNumber) => {
  if (mobileNumber[0] === "0") {
    let newNumber = mobileNumber.replace("0", "254");
    return newNumber;
  } else {
    return mobileNumber;
  }
};

export const getPaymentinfo = () => (dispatch, getState) => {
  // dispatch({
  //   type: GET_PAYMENT_INFO_LOADING,
  // });
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
    .get("/parking/parkinginfo",config)
    .then((res) => {
      dispatch({
        type: GET_PAYMENT_INFO,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};


export const clearInfo = () => (dispatch) => {
  dispatch({
    type: CLEAR_PARKING_INFO,
  });

};




export const sendsms = (data) => (dispatch,getState) => {
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
    .post("/parking/sendsms/",data,config)
    .then((res) => {
      console.log("called")
      dispatch({
        type: SENDSMS,
      });
    })
    .catch((error) => console.log(error));
};