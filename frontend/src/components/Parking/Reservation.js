import React, { Component } from "react";
import { connect } from "react-redux";
import { getParkingDetails,geocode } from "../../actions/parking";
import { Redirect } from "react-router-dom";
import {getAmount,formatmobileNumber} from "../../actions/parking";


class Reservation extends Component {
  state = {
      vehicleType: "PRIVATE",
      vehicleReg: "",
      hours: "0",
      minutes: "0",
      seconds: "0",
      mobileNumber: "",
      parkingspace: "",
      redirect: false,
      showme: true,
    };
  


  getFormStyle = () => {
    if (this.props.show && this.state.showme) {
      let formStyle = {
        display: "block",
        backgroundColor: "#3b3c36",
        width: "350px",
        height: "450px",
        borderRadius: "10px",
        margin: "2px",
        position: "absolute",
        top: "60px",
        zIndex: "5",
        padding: "1rem 1rem 0 1rem",
      };
      return formStyle;
    } else {
      let formStyle = {
        display: "none",
      };
      return formStyle;
    }
  };
  handleonChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      parkingspace: this.props.parkingspace,
    });
  };
  handleOnsubmit = (e) => {
    e.preventDefault();
    const {
      vehicleType,
      vehicleReg,
      hours,minutes,seconds,
      mobileNumber,
      parkingspace,
    } = this.state;
    const data = {
      vehicleType,
      vehicleReg,
      hours,minutes,seconds,
      mobileNumber: formatmobileNumber(mobileNumber),
      // amount: getAmount(vehicleType, duration),
      amount:1,
      parkingspace,
    };
    this.props.getParkingDetails(data);
    this.setState({
      vehicleType: "PRIVATE",
      vehicleReg: "",
      hours: "",
      minutes: "",
      seconds:"",
      mobileNumber: "",
      parkingspace: "",
      redirect: true,
    });
  };
  handleClick = () => {
    this.setState({
      ...this.state,
      showme:false
    })
    this.props.clearJSONlayer()
    
    this.setState({
      ...this.state,
      showme:true
    })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/detail" />;
    
    }
  
    return (
      <React.Fragment>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={this.getFormStyle()}>
            <div >
              <div style={{display:"flex",justifyContent: "flex-end"}}><p onClick = {this.handleClick} style={{margin:"0",width:"25px", height:"25px",textAlign:"center" ,borderRadius:"50%",fontWeight:"bolder",cursor: "pointer" ,backgroundColor:"white",color:"red",padding:"auto"}}>X</p></div>
              <form onSubmit={this.handleOnsubmit}>
                <div className="form-group">
                  <label className="text-white">Select Vehicle Type</label>
                  <select
                    className="form-control"
                    name="vehicleType"
                    onChange={this.handleonChange}
                    value={this.state.vehicleType}
                    required
                  >
                    {/* <option value="">Select your option</option> */}
                    <option value="PRIVATE">PRIVATE</option>
                    <option value="PICKUP">PICKUP</option>
                    <option value="NISSAN">NISSAN</option>
                    <option value="MOTORBIKE">MOTORBIKE</option>
                    <option value="TUKTUK">TUKTUK</option>
                    <option value="CANTER">CANTER</option>
                    <option value="LORRY">LORRY</option>
                    <option value="TAXI">TAXI</option>
                    <option value="MINIBUS">MINIBUS</option>
                    <option value="TRAILER">TRAILER</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="text-white">Vehicle Registration No.</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="KCX 456Z"
                    name="vehicleReg"
                    value={this.state.vehicleReg}
                    onChange={this.handleonChange}
                    required
                    autoComplete="off"

                  />
                </div>
                <div className="form-group">
                  <label className="form-check-label text-white">
                    Duration
                  </label>
                  <div style = {{display:"flex"}}>
                  <input
                    type="number"
                    className="form-control mr-1 w-20"
                    placeholder="hours"
                    name="hours"
                    max="12"
                  min="0"
                    value={this.state.duration}
                    onChange={this.handleonChange}
                  />    
                  <input
                    type="number"
                    className="form-control mr-1 w-40"
                    placeholder="minutes"
                    name="minutes"
                    max="59"
                  min="0"
                    value={this.state.duration}
                    onChange={this.handleonChange}
                  />
                          <input
                    type="number"
                    className="form-control w-40"
                    placeholder="seconds"
                    name="seconds"
                    max="59"
                  min="0"
                    value={this.state.duration}
                    onChange={this.handleonChange}
                    />
                    </div>
                </div>
               
                <div className="form-group">
                  <label className="form-check-label text-white">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="M-pesa number eg 254728111111"
                    name="mobileNumber"
                    value={this.state.mobileNumber}
                    onChange={this.handleonChange}
                    required
                    autoComplete="off"

                  />
                </div>

                <button
                  type="submit"
                  onClick={this.handleonClick}
                  href="/detail"
                  className="btn btn-block"
                  style={{ backgroundColor: "#319559" }}
                >
                  Proceed
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, {getParkingDetails })(
  Reservation
);
