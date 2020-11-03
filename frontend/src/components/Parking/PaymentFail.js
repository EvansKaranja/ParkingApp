import React, { Component } from "react";
import Header from "../Layout/Header";
import { Link , Redirect} from "react-router-dom";
import { connect } from "react-redux";
import {clearInfo} from "../../actions/parking"
class PaymentFail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  handleClick = () => {
    this.props.clearInfo()
 }
  render() {
      return (
        <div><Header/>
              <div style={{ width: "70vw", margin: "2rem auto",background:"rgb(208 47 47)", height: "200px", padding:"1rem" }}>
                  <div> <h3 style={{margin:"2rem 0", textAlign:"center"}}>Unable to process your payments</h3></div>
               <div><h5 style={{margin:"0.5rem 0 0 1rem", textAlign:"center"}}>Kindly, try to <Link  to = "/"  onClick = {this.handleClick}>reserve again</Link>...</h5></div>
                
      </div></div>
    );
  }
}
const mapStateToProps = (state) => ({
  paymentInfo:state.parking.paymentInfo
});
export default connect(mapStateToProps,{clearInfo})(PaymentFail);
