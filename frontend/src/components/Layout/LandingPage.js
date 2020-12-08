import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import "./landingPage.css"
import Header from "./Header";
import { Redirect } from "react-router-dom";
import {signInUser,signUpUser} from "../../actions/user"

class LandingPage extends Component {
  state = {
    email: "",
    firstName: "",
    lastName:"",
    password: "",
    confirmPassword: "",
    loginForm: true,
  };
  displayLoginForm = () => {
    this.setState({
      username: "",
      email: "",
      firstName: "",
      lastName:"",
      password: "",
      confirmPassword: "",
      loginForm: true,
  })
  }
  displayRegisterForm = () =>{
    this.setState({
      email: "",
      firstName: "",
      lastName:"",
      password: "",
      confirmPassword: "",
      loginForm: false,
  })
  }
handleOnchange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };
handleonSubmit = (e) => {
        e.preventDefault();
        const data = {
          email: this.state.email,
          password: this.state.password,
        };
        this.setState({
          email: "",
          password: "",
        });
        this.props.signInUser(data);
  console.log(data)
};
handleRegisterFormSubmittion = (e) => {
  e.preventDefault();
  const data = {
    email: this.state.email,
    password: this.state.password,
    confirmPassword: this.state.confirmPassword,
    first_name: this.state.firstName,
    last_name: this.state.lastName
  };
  this.setState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword:""
  });
  this.props.signUpUser(data);
};
  render() {
    if (this.props.user.isAuthenticated) {
      return <Redirect to="/map" />;
    } else {
      return (
        <div
          style={{
            height: "100vh",
            width: "100vw",
          }}
        >
          <Fragment>
            <Header />
            <div  className="gridContainer">
              <div className="item1">
                <div className="desc">
                  <p>ParkFiti aims at eliminating the agony of searching for a parking space within Nairobi CBD.
                  With the Mpesa intergration, motorists can pay their parking fee on fly, based on 
                  the duration they intend to occupy a parking space.In addition, the routing services built in, allows motorists to
                  locate the parking space they reserved.
                    <br/>
                    {this.state.loginForm ?
                      <button className="btn text-white " style={{ transform: "skewX(20deg)", margin: "30px 0 0 40%", backgroundColor: " #319559" }}>Create an account</button> 
   :<span></span> }</p>
                  

                </div>
              </div>
              <div className="item2"> 
                {this.state.loginForm?
                <div className="loginform">
                  <form onSubmit={this.handleonSubmit} >
            <div className="form-group">
              <label>
                <b>Email address</b>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                        name="email"
                        style = {{margin:"1rem 0 2rem "}}
                        
                value={this.state.email}
                        id="email"
                        className="form-control"
                onChange={this.handleOnchange}
                required 
                autoComplete="off"
              />
              <label>
                <b>Password</b>
              </label>
                      <input
                        style = {{margin:"1rem 0 2rem"}}
                type="password"
                placeholder="Enter Password"
                name="password"
                value={this.state.password}
                onChange={this.handleOnchange}
                className="form-control"
                required 
                autoComplete="off"
              />

              <button type="submit"  className="btn btn-block"
                  style={{ backgroundColor: "#319559" , margin:"2rem 0"}}>Login</button>
              <label>Don't have an account <Link to ="/" onClick={this.displayRegisterForm}>Sign up</Link></label>
            </div>
          </form>
                </div>:
                <div className="registerform">
                  <form onSubmit={this.handleRegisterFormSubmittion} >
                    <div className="form-group">
                    
              <label>
                <b>Email address</b>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                // style = {{margin:"1rem 0 2rem "}}
                value={this.state.email}
                className="form-control"
                onChange={this.handleOnchange}
                required 
                autoComplete="off"/>
                      <label>
                <b>First Name</b>
              </label>
              <input
                type="text"
                placeholder="Enter firstname"
                name="firstName"
                // style = {{margin:"1rem 0 2rem "}}
                value={this.state.firstName}
                className="form-control"
                onChange={this.handleOnchange}
                required 
                autoComplete="off"
                      />
                      <label>
                <b>Last Name</b>
              </label>
              <input
                type="text"
                placeholder="Enter lastname"
                name="lastName"
                // style = {{margin:"1rem 0 2rem "}}
                value={this.state.lastName}
                id="email"
                className="form-control"
                onChange={this.handleOnchange}
                required 
                autoComplete="off"
              />
              <label>
                <b>Password</b>
              </label>
                      <input
                        // style = {{margin:"1rem 0 2rem"}}
                type="password"
                placeholder="Enter Password"
                name="password"
                value={this.state.password}
                onChange={this.handleOnchange}
                className="form-control"
                required 
                autoComplete="off"
                      />
                      <label>
                <b>Repeat password</b>
              </label>
                      <input
                        // style = {{margin:"1rem 0 2rem"}}
                type="password"
                placeholder="Enter Password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleOnchange}
                className="form-control"
                required 
                autoComplete="off"
              />

              <button type="submit"  className="btn btn-block"
                  style={{ backgroundColor: "#319559" , margin:"1rem 0"}}>Register</button>
              <label>Have an account? <Link to ="/" onClick={this.displayLoginForm}>Sign in</Link></label>
            </div>

          </form>
              </div>}
              </div>
            </div>
          </Fragment>
        </div>
      );
    }
  }
}
const gridContainer={
  display: "grid",
  gridTemplateColumns: "auto auto "

}
const showcase = {
  fontSize: "30px",
  height: "100%",
  width: "100%",
  backgroundColor: "#319559",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps,{signInUser,signUpUser})(LandingPage);
