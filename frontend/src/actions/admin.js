import { ACTIVECASES,ILLEGALCASES, MAKESTAFF , VEHICLE_TYPE_COUNT,TOTAL_AMOUNT_PER_WEEK} from "./types";

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
        if(res.data.activeSerializer){
        dispatch({
          type: ACTIVECASES,
          payload: res.data,
        });
      }
      if(res.data.illegalCasesSerializer){
        dispatch({
          type: ILLEGALCASES,
          payload: res.data,
        });
      }
    
    
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

  export const dashboardData = () => (dispatch,getState) => {
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
      .get("/parking/dashboard/",config)
      .then((res) => {
        if(res.data["parking_type"]){
       let data = formatChartData(res.data["parking_type"])
        dispatch({
          type: VEHICLE_TYPE_COUNT,
          payload: data,
        });}
        if(res.data["total_amount_per_week"]){
        let data = FormatAmountData(res.data["total_amount_per_week"])
          dispatch({
            type: TOTAL_AMOUNT_PER_WEEK,
            payload: data,
          })
        }
      })
      .catch((error) => console.log(error));
  };

const formatChartData =(vehicleType)=>{
  var labels = []
  var data = []
  // var vehicleType = this.props.vehicleTypeCount["parking_type"]
  var vehicleTypes = {
      Private:0,
      Nissan:0,
      Pickup:0,
      Canter:0,
      Lorry:0,
      Taxi:0,
      Minibus:0,
      Trailer:0,
      MOTORBIKE:0,
  }
  for (var j in vehicleTypes){
      for(var i in vehicleType){
          if (j.toUpperCase()==i.toUpperCase()){
              vehicleTypes[j]+=vehicleType[i]
          }
      }
      labels.push(j)
      data.push(vehicleTypes[j])
  }
 
  let chartData = {
    labels:labels,
    datasets:[
        {
            label:'Vehicles',
            data:data,
            backgroundColor:[
                'rgba(255,99,132,0.6)',
                'rgba(54,162,235,0.6)',
                'rgba(255,206,86,0.6)',
                'rgba(75,192,192,0.6)',
                'rgba(153,102,255,0.6)',
                'rgba(255,159,64,0.6)',
                'rgba(255,120,235,0.6)',
                'rgba(255,206,132,0.6)',
                'rgba(255,162,86,0.6)',
                ]
        
        }
    ]
}
  return chartData
}
const FormatAmountData =(vehicleType)=>{
  var labels = []
  var data = []
  for (var j in vehicleType){
      labels.push(j)
      data.push(vehicleType[j])
  }
 
 console.log(data)
  let chartData = {
    labels:labels,
    datasets:[
        {
            label:'Vehicles',
            data:data,
            backgroundColor:[
                'rgba(255,99,132,0.6)',
                'rgba(54,162,235,0.6)',
                'rgba(255,206,86,0.6)',
                'rgba(75,192,192,0.6)',
                'rgba(153,102,255,0.6)',
                'rgba(255,159,64,0.6)',
                'rgba(255,120,235,0.6)',
                'rgba(255,206,132,0.6)',
                'rgba(255,162,86,0.6)',
                ]
        
        }
    ]
}
  return chartData
}