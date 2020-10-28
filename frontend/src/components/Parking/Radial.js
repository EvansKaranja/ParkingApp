import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import {clearInfo} from "../../actions/parking"
class Radial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage_time_remaining: "",
      time_remaining: "",
      intervalid: "",
      redirect:false,
    };
  }
  componentDidMount() {
    var intervalId = setInterval(this.parkingTime, 1000);
    this.setState({...this.state,intervalId: intervalId});
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  get_end_time = (arr) => {
    let time = new Date(this.props.paymentInfo.time_of_parking)

    if (Number(arr[0])) {
     time.setHours(time.getHours() + Number(arr[0]))
    }
    if (Number(arr[1])) {
       time.setMinutes(time.getMinutes() + Number(arr[1]))

    }
    if (Number(arr[2])) {
      time.setSeconds(time.getSeconds() + Number(arr[2]))

    }
    return time
  }
   parseMillisecondsIntoReadableTime=(milliseconds)=>{
    //Get hours from milliseconds
    var hours = milliseconds / (1000*60*60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
  
    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
  
    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
  
  
    return h + ':' + m + ':' + s;
  }
  parkingTime = () => {
    if (this.props.paymentInfo) {
      let time_of_parking = new Date(this.props.paymentInfo.time_of_parking)
      let currentTime = new Date()
      let duration = this.props.paymentInfo.duration
      let arr = duration.split(":")
      let end_of_parking = this.get_end_time(arr)
      let time_remaining = ((end_of_parking.getTime() - currentTime.getTime()))
      let total_time = (end_of_parking.getTime() - time_of_parking.getTime())
      let percentage_time_remaining = (100 - (Math.floor(time_remaining * 100 / total_time)))
      let formattedTime = this.parseMillisecondsIntoReadableTime(time_remaining)
      this.setState({
        ...this.state,
        percentage_time_remaining: percentage_time_remaining,
        time_remaining: formattedTime
      })
    }
  }
  handleClick = () => {
    this.props.clearInfo()
    this.setState({
      redirect:true
    })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/map"/>
    }
    if (this.state.percentage_time_remaining > 100 && this.props.paymentInfo.time_of_parking && this.props.paymentInfo.duration) {
      return <Redirect to="/repark" />
    }
    if (!this.props.paymentInfo.time_of_parking && !this.props.paymentInfo.duration && !this.state.redirect) {
      return (
        <div style={{height:"100vh",width:"100vw", display:"flex", justifyContent:"center", alignItems:"center",zIndex:5}}>
        <div
          style={{
            minWidth: "90vw",
            height: "250px",
            position: "absolute",
            top: "60px",
            padding: "10px",
            borderRadius: "10px",
              backgroundColor: "rgb(208 47 47)",
            zIndex:"5"
            
            
          }}
        >
          <div
              style={{
              height: "250px",
              minWidth: "600px",
              margin: "auto",
                color: "black"
              
            }}
            > <div> <h3 style={{margin:"3.5rem 0 0 0", textAlign:"center"}}>The system was unable to process your payments...</h3></div>
            <div><h5 style={{margin:"2.5rem 0 0 1rem", textAlign:"center"}}>Kindly, try to <Link  to = "/"  onClick = {this.handleClick}>reserve again</Link>...</h5></div>
            </div></div></div>
        
        
      );
    } else {
      // ..........................................................................................
      return (
        <div>
          <div
            style={{
              backgroundColor: "#3b3c36",
              width: "350px",
              height: "300px",
              margin: "5px",
              position: "absolute",
              top: "60px",
              padding: "10px",
              color: "white",
              borderRadius: "10px",
              zIndex:"5"
            }}
          >
            <div
              style={{
                height: "100px",
                width: "100px",
                display: "flex",
                justifyContent: "center",
                margin: "1rem auto 1rem auto ",
              }}
            >
              <CircularProgressbarWithChildren value={this.state.percentage_time_remaining}>
                <div style={{ fontSize: 12, marginTop: -5 }}>

                  <strong>{this.state.time_remaining}</strong>
                </div>
              </CircularProgressbarWithChildren>
            </div>
            <div className="form-group border-top-2 border-warning">
              <label className="form-check-label ">Extend Your Reservation</label>
              <form onSubmit={this.handleOnsubmit}>
                <div className="form-group" style={{ display: "flex" }}>
                  <input
                    type="number"
                    className="form-control mr-1 w-20 rounded-0 border-0"
                    placeholder="hrs"
                    name="hours"
                    max="12"
                    min="0"
                    value={this.state.duration}
                    onChange={this.handleonChange}
                  />
                  <input
                    type="number"
                    className="form-control mr-1 w-40 rounded-0 border-0"
                    placeholder="mins"
                    name="minutes"
                    max="60"
                    min="0"
                    value={this.state.duration}
                    onChange={this.handleonChange}
                  />
                  <input
                    type="number"
                    className="form-control mr-1 w-40 rounded-0 border-0"
                    placeholder="sec"
                    name="seconds"
                    max="60"
                    min="0"
                    value={this.state.duration}
                    onChange={this.handleonChange}
                  />
                  <button type="submit" className="btn btn-success rounded-0" style={{ width: "90px" }} >Confirm</button>
                </div>
              </form>
            </div>
            <button type="button" className="btn btn-danger btn-block mr-2" onClick = {this.handleClick}>
              Cancel Reservation
          </button>
          </div>
        </div>
     )
      
    }
  }
}
const mapStateToProps = (state) => ({
  paymentInfo:state.parking.paymentInfo
});
export default connect(mapStateToProps,{clearInfo})(Radial);
