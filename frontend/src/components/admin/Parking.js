import React, { Component } from "react";
import { connect } from "react-redux";
import Dashboard from "./Dashboard"
import {adminstration,makeUserStaff} from "../../actions/admin";
import Spinner from "../common/Spinner"
import {  Redirect} from "react-router-dom";



import Header from "../Layout/Header";
let config = {};
config.params = {
  // center: [-1.0993652999999999, 37.0109084],
  center: [-1.28488, 36.825894],
  zoomControl: false,
  zoom: 16,
  maxZoom: 19,
  minZoom: 1,
  scrollwheel: false,
  legends: true,
  infoControl: false,
  attributionControl: true,
};
config.tileLayer = {
  uri: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  params: {
    minZoom: 1,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    id: "",
    accessToken: "",
  },
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      tileLayer: null,
      activegeojson: null,
      illegalgeojson:null,
      geojsonLayer: null,
      intervalid: "",
      email:"",
      displayDashboard:false,
      active:false,
      illegal:false,

    };
    this.mapRef = React.createRef();
    this.init = this.init.bind(this);
  }
  componentDidMount() {
    if (!this.state.map && !this.props.paymentInfo) this.init(this.mapRef.current);



  }
  componentDidUpdate(prevProps,prevState){
    
     if (
      this.props.active &&
      this.state.map && prevProps !=this.props
    ) {
      
      this.addGeoJSONLayer(this.props.active)

    } 
    if (
      this.props.illegal &&
      this.state.map && prevProps !=this.props
    ) {
      this.addGeoJSONLayer(this.props.illegal)

    } 
  }
  
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  
  
  getData =(e)=>{

    if(e.target.name=="active"){
      this.props.adminstration({"query":"active"})
      this.setState({...this.state,active:true,illegal:false,displayDashboard:false})
    
    }
      
    if(e.target.name=="illegal"){
      this.props.adminstration({"query":"illegal"})
      this.setState({...this.state,illegal:true,active:false,displayDashboard:false})

    }
 


  }
  /*_________Map Methods___________________*/

  // Initialize map Elemenent
  init = (id) => {
        let map = L.map(id,config.params)
        const tileLayer = L.tileLayer(
          config.tileLayer.uri,
          config.tileLayer.params
        ).addTo(map);
        this.setState({ map, tileLayer });
        L.control.zoom({
          position:'topright'
        }).addTo(map)
  };
// Add geojson layer
addGeoJSONLayer =(geojson)=> {
  if(this.state.active){
    if(this.state.geojsonLayer)this.state.map.removeLayer(this.state.geojsonLayer)
   const geojsonLayer = L.geoJson(geojson,{pointToLayer: this.pointToLayer,}).addTo(this.state.map)
  this.setState({ ...this.state,geojsonLayer });}

  if(this.state.illegal){
    if(this.state.geojsonLayer)this.state.map.removeLayer(this.state.geojsonLayer)
    const geojsonLayer = L.geoJson(geojson,{pointToLayer: this.illigalPointToLayer,}).addTo(this.state.map)
   this.setState({ ...this.state,geojsonLayer });}
}


  // Marker
  pointToLayer=(feature, latlng) =>{
    var greenIcon = L.icon({
      iconUrl: "/static/frontend/images/test.png",
color:"red",
      iconSize: [50, 60], // size of the icon
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
 
    return L.marker(latlng, { icon: greenIcon });
  }
    // Marker
    illigalPointToLayer=(feature, latlng) =>{
      var greenIcon = L.icon({
        iconUrl: "/static/frontend/images/redparking.png",
  color:"red",
        iconSize: [50, 60], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
      });
   
      return L.marker(latlng, { icon: greenIcon });
    }

  // this.zoomToFeature(geojsonLayer);

/* _______Form_____*/
// Form
handleonChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value,
  });
};
makeUserStaff=(e)=>{
  e.preventDefault();
  this.props.makeUserStaff({"email":this.state.email})
  this.setState({
    ...this.state,email:""
  })

}
// Dashboard
displayDashboard =()=>{
  this.setState({
    ...this.state,displayDashboard:!this.state.displayDashboard
  })

}

  render() {
    if (this.props.paymentInfo) {
      return <Redirect to="/parking" />
    } else {

      return (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            overflow: "hidden",

          }}
        >
          <Header />
          <div>
            <div style={{display:"flex"}}>
  
              <div style={{backgroundColor: "#3b3c36",width: "400px",height: "100vh",top: "60px",zIndex: "5",padding: "0 20px",color: "white"}}>
                <div
                  style={{
                    height: "8vh",
                    // paddingTop: "5px",
                    borderRadius: "5px",
                  }}
                >   
                  
                  <br/>
                  
                  <button
                    type="button"
                    onClick={this.getData}
                    className="btn btn-primary btn-block mr-2 mb-8 mt-3 "
                    name="active"
                  >
                   Active Parking {this.props.active?<span style={{padding:"3px",color:"black",borderRadius:"100px", backgroundColor:"white"}}>{this.props.active["features"].length}</span>:<span></span>}
              </button>
              <button
                    type="button"
                    disabled={this.props.parkingSpaces}
                    onClick={this.getlocation}
                    className="btn btn-warning btn-block mr-2 mb-2 mt-3 "
                  >
                   Rerserved Session 
              </button>
              <button
                    type="button"
                    onClick={this.getData}
                    name="illegal"
                    className="btn btn-danger btn-block mr-2 mb-2 mt-3 "
                  >
                   Illegal Session {this.props.illegal?<span style={{padding:"3px",color:"black",borderRadius:"100px", backgroundColor:"white"}}>{this.props.illegal["features"].length}</span>:<span></span>}
              </button>
              {this.props.user.is_superuser?<span>

                <button
                    type="button"
                    disabled={this.props.parkingSpaces}
                    onClick={this.displayDashboard}
                    className="btn btn-info btn-block mr-2 mb-2 mt-3 "
                  >
                   View Dashboard 
              </button>
              <button
                    type="button"
                    disabled={this.props.parkingSpaces}
                    onClick={this.getlocation}
                    className="btn btn-dark btn-block mr-2 mb-2 mt-3 "
                  >
                   Add staff
              </button>
              <form onSubmit={this.makeUserStaff}>
                    <div className="form-group" style={{ display: "flex" }}>
                  
                      <input
                        type="email"
                        className="form-control rounded-0"
                        placeholder="staff email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleonChange}
                        required
                        autoComplete="off"
                      />
                      <button type="submit" disabled={this.props.parkingSpaces} className="btn btn-success rounded-0" style={{ width: "100px" }} >Send</button>
                      
                    </div>
                  </form>

              </span>:<span></span>}
                </div>
              </div>
              {/* *******************Map Section***************************************** */}
              <div style={{
                height: "100vh",
                width: "100vw",
                position: "relative",
                overflow:"hidden",
                backgroundColor:"#3b3c36",
          borderLeft:"1px solid #F6f6f6"
                // zIndex: "1",
              }}> 
              
                <div
              ref={this.mapRef}
              id="map"
              style={{
                height: "100%",
                width: "100%",
                zIndex: "1",
              }}
            ></div>
            {this.state.displayDashboard?
           <div style={{position:"absolute", height:"100%",width:"100%",overflow:"hidden",zIndex:"5",top:"0px",left:"0"}}><Dashboard/></div>:<span></span>}
            </div>
             
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  user: state.user.user,
  location: state.parking.location,
  parkingSpaces: state.parking.parkingSpaces,
  paymentInfo:state.parking.paymentInfo,
  active:state.admin.activeCases,
  illegal:state.admin.illegalCases,

  
});

export default connect(mapStateToProps,{adminstration,makeUserStaff})(Map);
