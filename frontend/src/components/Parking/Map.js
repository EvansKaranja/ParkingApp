import React, { Component } from "react";
import { connect } from "react-redux";
import Reservation from "./Reservation";
import {geocodeUserLocation,getUserLocation,getParkingSpaces,clearInfo} from "../../actions/parking";
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
      selectedOption:"onstreet",
      disabled:false,
      location: "",
      display:true,
    };
    this.mapRef = React.createRef();
    this.init = this.init.bind(this);
  }
  componentDidMount() {
    if (!this.state.map && !this.props.paymentInfo) this.init(this.mapRef.current);

  }
  componentDidUpdate(preProps, PrevState) {
    if (this.props.location && !this.props.parkingSpaces) {
      this.state.map.setView([this.props.location[0], this.props.location[0]])
      const data = {
        location:this.props.location,
        parkingType:this.props.parkingType

      }
      this.props.getParkingSpaces(data)
    }
    if (
      this.props.parkingSpaces &&
      this.state.map &&
      !this.state.geojsonLayer
    ) {
      this.addGeoJSONLayer(this.props.parkingSpaces);
    } 
  }
  /*----Map Segmetn-----*/

  // Initialize Map
  init = (id) => {
    let map = L.map(id,config.params)
    const tileLayer = L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXZhbnNrYXJhbmphIiwiYSI6ImNqdm5yNjF6ODFsaWk0OXJ0NzhwcXF1NHYifQ.LlDfnOCws33cmI5NmYh3nA'}
    ).addTo(map);
    this.setState({ map, tileLayer });
    L.control.zoom({
      position:'topright'
    }).addTo(map)
};

  // adding json layer
  addGeoJSONLayer =(geojson)=> {
    const geojsonLayer = L.geoJson(geojson, {
      onEachFeature: this.onEachFeature,
      pointToLayer: this.pointToLayer,
    });
    this.state.tileLayer.on("load",()=>geojsonLayer.addTo(this.state.map))

    
    this.setState({ geojsonLayer });

    this.zoomToFeature(geojsonLayer);
    var userlocation = L.icon({
      iconUrl: "/static/frontend/images/user-location.png",
      iconSize: [50, 60], // size of the icon
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
    if(this.props.location)L.marker(this.props.location, { icon: userlocation })
 

  }

  // Zoom feature
  zoomToFeature =(target)=> {
    var fitBoundsParams = {
      paddingTopLeft: [10, 10],
      paddingBottompLeft: [10, 10],
    };
    this.state.map.fitBounds(target.getBounds(), fitBoundsParams);
  }

  onEachFeature=(feature, layer) =>{
    if (feature) {
      layer.on({
        click: (e) => {
          return this.highlightFeature(e);
        },
      });
    }
  }

  highlightFeature = (e) => {
    this.setState({ show: true, parkingspace: e.target.feature });
  }
  
  pointToLayer=(feature, latlng) =>{
    var greenIcon = L.icon({
      iconUrl: "/static/frontend/images/parking2.png",
color:"red",
      iconSize: [40, 60], // size of the icon
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
 
    return L.marker(latlng, { icon: greenIcon });
  }

  
  clearJSONlayer=()=>{
    console.log("called")
    this.props.clearInfo()
    this.state.map.removeLayer(this.state.geojsonLayer);
    location.reload();
    this.setState({
      ...this.state,
      show:false,
      geojsonLayer:null,
      display:true,
      parkingspace:null
    })
  }

  /*----------------------------------form-----------------------------------------------------------*/
handleonChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
handleOnsubmit = (e) => {
  e.preventDefault();
  let name = this.state.location

    this.props.geocodeUserLocation(name)
    this.setState({
      location: "",
      display:false
      
    })
  
}
  getlocation = () => {

    const data = {
      parkingType: this.state.selectedOption,
      disabled: this.state.disabled,

    }
    console.log(data)
    this.props.getUserLocation(data)

this.setState({display: false});
  
};
  handleClick = (e) => {


  this.setState({...this.state,disabled:!this.state.disabled})

}
handleOptionChange=(e)=>{
  this.setState({
    selectedOption: e.target.value
  });
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
              <div style={{backgroundColor: "#3b3c36",width: "400px",height: "100vh",top: "60px",zIndex: "5",padding: "20px",color: "white"}}>
                <div
                  style={{
                    height: "8vh",
                    paddingTop: "5px",
                    borderRadius: "5px",
                  }}
                >     <label className="mt-2">
                    <h5>1. <u>Type of Parking:</u></h5>

              </label>
              <div>
              <div className="form-check-inline">
              <label className="form-check-label">
              <input type="radio" className="form-check-input" name="onstreet" value="onstreet" onChange={this.handleOptionChange} checked={this.state.selectedOption==="onstreet"}/>Onstreet   </label>
              </div>
              <div className="form-check-inline">
              <label className="form-check-label">
              <input type="radio" className="form-check-input" name="offstreet" value="offstreet" onChange={this.handleOptionChange} checked={this.state.selectedOption==="offstreet"}/>Offstreet
              </label>
              </div>
              </div>
                  <br/>
                  <label>
                    <h5>2. <u>Choose Destination to park:</u></h5>
              </label>
                  <button
                    type="button"
                    disabled={this.props.parkingSpaces}
                    onClick={this.getlocation}
                    className="btn btn-success btn-block mr-2 mb-2 mt-2"
                  >
                    Reserve within your vicinity
              </button>
            <div style={{textAlign:"center", color:"yellow", fontSize:"20px"}}><label>OR</label></div>
                  <label>
                    Reserve around:
              </label>
                  <form onSubmit={this.handleOnsubmit}>
                    <div className="form-group" style={{ display: "flex" }}>
                  
                      <input
                        type="text"
                        className="form-control rounded-0"
                        placeholder="e.g. Nation Center"
                        name="location"
                        value={this.state.location}
                        onChange={this.handleonChange}
                        required
                        autoComplete="off"
                      />
                      <button type="submit" disabled={this.props.parkingSpaces} className="btn btn-success rounded-0" style={{ width: "100px" }} >Search</button>
                      
                    </div>
                  </form>
                
                  {this.state.geojsonLayer?
                  <button
                    type="button"
                    disabled={this.props.parkingSpaces}
                    // onClick={this.clearLayer}
                    className="btn btn-danger btn-block mr-2 mb-2 mt-8 "
                  >
                    Clear  Layer
              </button>:<span>  <label style={{color:"Red", fontStyle:"italic"}}>
                    Only for Persons with Disabilities
              </label>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" name="disabled" onClick={this.handleClick} />
                      <label className="form-check-label" >Disabled Parking </label>
                    </div></span>}
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
            
            <Reservation
                show={this.state.show}
                parkingspace={this.state.parkingspace}
                clearJSONlayer = {this.clearJSONlayer}
              />
            {!this.state.display && !this.state.geojsonLayer  ? <Spinner /> : <br />}
       
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  location: state.parking.location,
  parkingSpaces: state.parking.parkingSpaces,
  paymentInfo:state.parking.paymentInfo,
  parkingType: state.parking.parkingType
  
});

export default connect(mapStateToProps,{getParkingSpaces,geocodeUserLocation,getUserLocation,clearInfo})(Map);
