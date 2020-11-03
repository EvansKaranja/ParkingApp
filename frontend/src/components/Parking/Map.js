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
      display:true
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
      // this.props.getParkingSpaces(this.props.location.parkingType) 
      this.props.getParkingSpaces()
    }
    if (
      this.props.parkingSpaces &&
      this.state.map &&
      !this.state.geojsonLayer
    ) {
      this.addGeoJSONLayer(this.props.parkingSpaces);
    } 
  }
  // adding json layer
  addGeoJSONLayer =(geojson)=> {
    const geojsonLayer = L.geoJson(geojson, {
      onEachFeature: this.onEachFeature,
      pointToLayer: this.pointToLayer,
    });
    this.state.tileLayer.on("load",()=>geojsonLayer.addTo(this.state.map))

    
    this.setState({ geojsonLayer });

    this.zoomToFeature(geojsonLayer);
  }
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
      iconUrl: "https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png",

      iconSize: [25, 41], // size of the icon
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
 
    return L.marker(latlng, { icon: greenIcon });
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
  // ------------------------------
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
      offstreet: this.state.offstreet,
      onstreet: this.state.onstreet,
      disabled: this.state.disabled,
    }
    this.props.getUserLocation(data)

this.setState({display: false});
  
};
  handleClick = (e) => {
    
    if (e.target.name === "onstreet") {
      const onstreet = !this.state.onstreet
      this.setState({
     onstreet:onstreet
      })
    }
    if (e.target.name === "offstreet") {
      const offstreet = !this.state.offstreet
      this.setState({
     offstreet:offstreet
      })
    }
    if (e.target.name === "disabled") {
      const disabled = !this.state.disabled
      this.setState({
     disabled:disabled
      })
    }

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
                    Type of Parking:
              </label>
                  <div>
           
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" onClick={this.handleClick} name="onstreet" />
                      <label className="form-check-label" >Onstreet</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" name="offstreet" onClick={this.handleClick} />
                      <label className="form-check-label" >Offstreet</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" name="disabled" onClick={this.handleClick} />
                      <label className="form-check-label" >disabled</label>
                    </div>
                  </div>
                  <br/>
                  <label>
                    Choose Destination to park:
              </label>
                  <button
                    type="button"
                    disabled={this.props.parkingSpaces}
                    onClick={this.getlocation}
                    className="btn btn-success btn-block mr-2 mb-2 mt-3 "
                  >
                    Park within your vicinity
              </button>
                  <label>
                    Park around:
              </label>
                  <form onSubmit={this.handleOnsubmit}>
                    <div className="form-group" style={{ display: "flex" }}>
                  
                      <input
                        type="text"
                        className="form-control rounded-0"
                        placeholder="building, street, ..."
                        name="location"
                        value={this.state.location}
                        onChange={this.handleonChange}
                        required
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
              </button>:<span></span>}
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
  paymentInfo:state.parking.paymentInfo
  
});

export default connect(mapStateToProps,{getParkingSpaces,geocodeUserLocation,getUserLocation,clearInfo})(Map);
