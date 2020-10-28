import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Header from "../Layout/Header";
import { connect } from "react-redux";
import {clearInfo} from "../../actions/parking"

class Detail extends Component {
  state = {
    redirect: false,
  };
  handleOnClick = ()=>{
this.props.clearInfo()
  }
  handleClick = (e) => {
    const {
      vehicleType,
      vehicleReg,
      hours,
      minutes,
      seconds,
      mobileNumber,
      amount,
      parkingspace,
    } = this.props.parkingDetails;
    var data = {
      vehicleType,
      vehicleReg,
      duration :`${hours}:${minutes}:${seconds}`,
      mobileNumber,
      amount,
      parkingspace,
    };
    const token = this.props.token
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (token) {
      config.headers["Authorization"] = `TOKEN ${token}`;
    }
axios
    .post("/api/reserveParking/", data,config)
    .then((res) => {
      console.log(res);
    })
  .catch((error) => console.log(error));
    this.setState({
  redirect:true
})    
  };

  render() {
    const {
      vehicleType,
      vehicleReg,
      hours,
      minutes,
      seconds,
      mobileNumber,
      amount,
    } = this.props.parkingDetails;
    if (!this.props.parkingDetails) {
      return <Redirect to="/" />;
    }
    if (this.state.redirect) {
      return <Redirect to="/parking" />;
    }
    return (
      <div
        style={{ height: "100vh", width: "100vw", backgroundColor: "#319559" }}
      >
        <Header />
        <div className="contaner-fluid">
          <div className="row">
            <div
              className="col-sm-4 p-5"
              style={{ backgroundColor: "#319559" }}
            >
              <img
                className="mx-auto my-auto d-block mt-50"
                style={{ width: "200px", height: "200px" }}
                src="https://epayments.nairobi.go.ke/img/logo/nairobi-city-county-logo.png"
              />
            </div>
            <div className="col-sm-8 bg-dark pr-5 m-0">
              <table className="table table-dark table-hover ml-2 m-0 ">
                <thead>
                  <tr>
                    <th className="text-right p-2">Confirm Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Parking Space id</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>Vehicle Type</td>
                    <td>{vehicleType}</td>
                  </tr>
                  <tr>
                    <td>Registration Number</td>
                    <td>{vehicleReg}</td>
                  </tr>
                  <tr>
                    <td>Duration</td>
                    <td>{hours}{" "}{hours>1?<span>hrs</span>:<span>hr</span>}{" "}{minutes}{" "}{minutes>1?<span>mins</span>:<span>min</span>}{" "}{ seconds}{" "}{seconds>1?<span>sec</span>:<span>sec</span>}</td>
                  </tr>
                  <tr>
                    <td>Mobile Number</td>
                    <td>{mobileNumber}</td>
                  </tr>
                  <tr>
                    <td>Amount</td>
                    <td>Ksh {amount}</td>
                  </tr>
                  <tr>
                    <td>
                  
                        <Link
                        to="/map"
                        onClick = {this.handleOnClick}
                        className="btn btn-bg btn-block bg-danger text-white"
                        style ={{margin:"8px"}}
                        >
                          Cancel Reservation
                        </Link>
                    </td>
                    <td>
                      <button
                        type="button"
                        name="pay"
                        onClick={this.handleClick}
                        className="btn btn-bg btn-block bg-success text-white"
                      >
                        Confirm Reservation
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  parkingDetails: state.parking.parkingDetails,
  token:state.user.token
});
export default connect(mapStateToProps, {clearInfo})(Detail);
