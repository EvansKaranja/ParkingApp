import React, { Component } from "react";
import { connect } from "react-redux";
import Reservation from "../Parking/Reservation";
import {adminstration} from "../../actions/admin";
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
      numberEntrances: null,
      location:"",
      geojson: null,
      geojsonLayer: null,
      subwayLinesFilter: "*",
      show: false,
      parkingspace: null,
      onstreet: false,
      offstreet: false,
      disabled:false,
      location: "",
      display:true,
      intervalid: "",

    };
    this.mapRef = React.createRef();
    this.init = this.init.bind(this);
  }
  componentDidMount() {
    if (!this.state.map && !this.props.paymentInfo) this.init(this.mapRef.current);
    // this.props.adminstration()


  }
  componentDidUpdate(prevProps,prevState){
    if(prevProps!==this.props && window.location.href==="http://127.0.0.1:8000/#/admin"){
      var intervalId = setInterval(this.props.adminstration, 30000);
        this.setState({...this.state,intervalId: intervalId});
     }
       

  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  
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
              <div style={{backgroundColor: "#3b3c36",width: "400px",height: "100vh",top: "60px",zIndex: "5",padding: "20px",color: "white"}}>
                <div
                  style={{
                    height: "8vh",
                    paddingTop: "5px",
                    borderRadius: "5px",
                  }}
                >   
                  
                  <br/>
                  
                  <button
                    type="button"
                    disabled={this.props.parkingSpaces}
                    onClick={this.getlocation}
                    className="btn btn-primary btn-block mr-2 mb-2 mt-3 "
                  >
                   Active Parking {this.props.active?<span style={{padding:"3px",color:"black",borderRadius:"100px", backgroundColor:"white"}}>{this.props.active["features"].length}</span>:<span></span>}
              </button>
              <button
                    type="button"
                    disabled={this.props.parkingSpaces}
                    onClick={this.getlocation}
                    className="btn btn-warning btn-block mr-2 mb-2 mt-3 "
                  >
                   Session Ending
              </button>
              <button
                    type="button"
                    disabled={this.props.parkingSpaces}
                    onClick={this.getlocation}
                    className="btn btn-danger btn-block mr-2 mb-2 mt-3 "
                  >
                   Illegal Session {this.props.illigal?<span style={{padding:"3px",color:"black",borderRadius:"100px", backgroundColor:"white"}}>{this.props.illigal["features"].length}</span>:<span></span>}
              </button>
              {this.props.user.is_superuser?<span>

                <button
                    type="button"
                    disabled={this.props.parkingSpaces}
                    onClick={this.getlocation}
                    className="btn btn-info btn-block mr-2 mb-2 mt-3 "
                  >
                   View Revenue
              </button>
              <button
                    type="button"
                    disabled={this.props.parkingSpaces}
                    onClick={this.getlocation}
                    className="btn btn-dark btn-block mr-2 mb-2 mt-3 "
                  >
                   Add staff
              </button>

              </span>:<span></span>}
                </div>
              </div>
              <div
              ref={this.mapRef}
              id="map"
              style={{
                height: "93vh",
                width: "100vw",
                position: "relative",
                zIndex: "1",
              }}
            ></div>
              {/* ......................................... */}
            
            </div>
            {!this.state.display && !this.state.geojsonLayer  ? <Spinner /> : <br />}
       
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
  illigal:state.admin.illegalCases,

  
});

export default connect(mapStateToProps,{adminstration})(Map);
