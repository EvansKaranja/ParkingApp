import React, { Component } from "react";
import Header from "../Layout/Header";
import { Link , Redirect} from "react-router-dom";
import { connect } from "react-redux";
import {clearInfo} from "../../actions/parking"
class Repark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  handleClick = () => {
    this.props.clearInfo()
 }
  render() {
    // if (!this.props.paymentInfo) {
    //   return <Redirect to="/"/>
    // }
      return (
        <div><Header/>
              <div style={{ width: "70vw", margin: "2rem auto",background:"#f4f4f4", height: "350px", padding:"1rem" }}>
                  <div> <h3 style={{margin:"2rem 0", textAlign:"center"}}>Sorry, your reservation session is over</h3></div>
                  <div><h5 style={{margin:"2.5rem 0", textAlign:"center"}}>Thank you for using ParkFiti !!!</h5></div>
                  <div style={{ textAlign: "center", paddingTop:"20px" }}><Link className="btn btn-danger " onClick = {this.handleClick}  to = "/"  style = {{color:"white",width:"200px"}}>Reserve Again</Link></div>
      </div></div>
    );
  }
}
const mapStateToProps = (state) => ({
  paymentInfo:state.parking.paymentInfo
});
export default connect(mapStateToProps,{clearInfo})(Repark);
