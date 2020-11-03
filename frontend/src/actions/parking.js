import {
  GET_PARKING, GET_PARKING_DETAILS,
  SET_USER_LOCATION, SET_GEOCODED_LOCATION, GET_PAYMENT_INFO,CLEAR_PARKING_INFO
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
export const geocodeUserLocation = (place) => (dispatch,getState) => {
    // axios
      //     .get(
      //       "https://maps.googleapis.com/maps/api/geocode/json?address=NationcenterNairobi&key=AIzaSyDtpMTuOFA4zWAkpioamQKHTsQCwVRnsgI"
      //     )
      //   .then((res) => {
      //       console.log(res.data.results[0])
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
  console.log(place)
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


//get parkingspaces
export const getParkingSpaces = () => (dispatch) => {
  axios
    .get(
      "https://gist.githubusercontent.com/EvansKaranja/c92ecba827860a15389d701731b292b0/raw/3bf3d4ea48a05912dfb08fb3309a75a50c5e7942/parkingspaces.geojson"
    )
    .then((res) => {
      console.log(res.data)
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
    .get("/parking/parkinginfo", config)
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