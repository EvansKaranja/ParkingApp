import React, { Component } from "react";
import { connect } from "react-redux";
import { Link} from "react-router-dom";
import {clearInfo} from "../../actions/parking"
import { signOutUser, getUser } from "../../actions/user";
class Header extends Component {
  state = {
    displaySigninForm: "none",
    displaySignUpForm: "none",
  };
  componentDidMount() {
if(this.props.token)this.props.getUser();
  }
  handlesigninClick = () => {
    this.setState({ ...this.state, displaySigninForm: "block" });
  };
  handleSignupClick = () => {
    this.setState({ ...this.state, displaySignUpForm: "block" });
  };
  handleCancel = () => {
    const displaySigninForm = "none";
    this.setState({ displaySigninForm });
    console.log(this.state.displaySigninForm);
  };
  handleCancelSignupform = () => {
    this.setState({ ...this.state, displaySignUpForm: "none" });
    console.log(this.state.displaySigninForm);
  };
  handleSignout = () => {
    this.props.signOutUser();
    console.log(this.props.isAuthenticated);
  };
  handleClick = () => {
    this.props.clearInfo()
  }
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-md navbar-dark"
          style={{ backgroundColor: "#319559" }}
        >
          <Link className="navbar-brand" to ="" onClick = {this.handleClick}>
            ParkFiti
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="collapsibleNavbar"
          >
            {this.props.isAuthenticated ? (
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <span
                    style={{ cursor: "pointer" }}
                    className="nav-link text-white"
                  >
                    Welcome,{" "}
                    <span style={{ color: "#FFDC01" }}>
                      {this.props.user.first_name}
                    </span>
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link text-white"
                    style={{ cursor: "pointer" }}
                    onClick={this.handleSignout}
                  >
                    SignOut
                  </span>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ">
                  <li className="nav-item">
                  
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
  token:state.user.token
});
export default connect(mapStateToProps, { signOutUser, getUser ,clearInfo})(Header);
