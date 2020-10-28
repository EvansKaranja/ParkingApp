import React, { Component } from "react";
import { connect } from "react-redux";
import {getPaymentinfo} from "../../actions/parking"
import Header from "../Layout/Header";
import Radial from "./Radial";
import "./parking.css";
import Spinner from "../common/Spinner"
let config = {};
config.params = {
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
class Parking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      tileLayer: null,
      location: null,
    };
    this.mapRef = React.createRef();

  }
  componentDidMount() {
    if (!this.props.paymentInfo) {
      this.props.getPaymentinfo()
    if (!this.state.map ) this.init(this.mapRef.current);

    } else {
      this.init(this.mapRef.current)
    }


    

  }
  
  // componentDidUpdate() {
  //   if (this.props.location && this.props.paymentInfo&&!this.props.loading) {
  //     console.log("location")
  //     this.addCircle(this.props.location);
  //     this.addRoute(
  //       this.props.location,
  //       this.props.parkingDetails.parkingspace
  //     );
  //   }
  // }
  // addRoute = (a, b) => {
  //   L.Routing.control({
  //     router: L.Routing.mapbox(
  //       "pk.eyJ1IjoiZXZhbnNrYXJhbmphIiwiYSI6ImNqdm5yNjF6ODFsaWk0OXJ0NzhwcXF1NHYifQ.LlDfnOCws33cmI5NmYh3nA"
  //     ),
  //     waypoints: [
  //       L.latLng(a.latitude, a.longitude),
  //       L.latLng(b.geometry.coordinates[1], b.geometry.coordinates[0]),
  //     ],
  //   }).addTo(this.state.map);
  // };
  // addCircle = (x) => {
  //   var circle = L.circle([x.latitude, x.longitude], {
  //     color: "red",
  //     fillColor: "#f03",
  //     fillOpacity: 0.5,
  //     radius: x.accuracy,
  //   });
  //   circle.addTo(this.state.map);
  // };
  init = (id) => {
    if (this.state.map) return;
    let map = L.map(id, config.params);
    // L.control.zoom({ position: "topright" }).addTo(map);
    // L.control.scale({ position: "bottomleft" }).addTo(map);

    const tileLayer = L.tileLayer(
      config.tileLayer.uri,
      config.tileLayer.params
    ).addTo(map);

    this.setState({ map, tileLayer });
  };

  render() {
    return (
          <div
          style={{
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
            }}
        >
          <Header />
          <div
            ref={this.mapRef}
            id="map"
            style={{
              height: "90vh",
              width: "100vw",
              // padding: "10px",
              borderTop: "2px solid #FFDC01",
              position: "relative",
              zIndex: "1",
            }}
        ></div>
        {this.props.loading?<Spinner/>:<Radial/>}
        </div>
      );
      }
    }

const mapStateToProps = (state) => ({
  parkingDetails: state.parking.parkingDetails,
  location: state.parking.location,
  loading: state.parking.loading,
  paymentInfo:state.parking.paymentInfo
});

export default connect(mapStateToProps, {getPaymentinfo})(Parking);
