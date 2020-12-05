import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect} from "react-router-dom";
import {clearInfo} from "../../actions/parking"
import { signOutUser, getUser } from "../../actions/user";
class Header extends Component {
  state = {
    displaySigninForm: "none",
    displaySignUpForm: "none",
    adminstrator:false
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
  adminstrator = () => {
    this.setState({
      ...this.state,
      adminstrator:true
    })
  }
  render() {
    if(this.state.adminstrator){
      return <Redirect to="/admin"/>
    }
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
                {this.props.user.is_staff?
                <li className="nav-item" style={{border:"2px solid black"}}>
                  <span
                    className="nav-link text-white"
                    style={{ cursor: "pointer" }}
                    onClick={this.adminstrator}
                  >
                    {this.props.user.is_superuser?<span>Admin</span>:<span>Staff</span>}
                  </span>
                </li>:<span></span>}
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
