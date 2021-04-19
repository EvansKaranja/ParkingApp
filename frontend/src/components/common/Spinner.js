import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import { connect } from "react-redux";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
      return (
       
        <div  style={{
            backgroundColor: "rgba(108,109,104,0.92)",
            // opacity: "0.9",
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: "0px",
            color: "white",
            display: "flex",
            justifyContent: "center",
          alignItems: "center",
            zIndex:"5"
          }}>
            <div className="sweet-loading" >
        <BounceLoader
          css={override}
          size={200}
          color={"#FFDC01"}
          loading={this.state.loading}
                />
                <h4 style={{marginTop:"20px"}}>{window.location.href==="http://127.0.0.1:8000/#/parking"?<span>Processing payments...</span>:<span>Getting parking spaces ...</span>}</h4>
      </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  
  parkingSpaces:state.parking.parkingSpaces
  
});
export default connect(mapStateToProps)(Spinner);
