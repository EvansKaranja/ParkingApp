import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import "./App.css";
import LandingPage from "./Layout/LandingPage";
import Map from "./Parking/Map";
import Detail from "./Parking/Detail";
import Parking from "./Parking/Parking";
import PrivateRoute from "./common/PrivateRoute";
import Repark from './Parking/Repark'
import Fail from './Parking/PaymentFail'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <PrivateRoute exact path="/map" component={Map} />
              <PrivateRoute exact path="/detail" component={Detail} />
              <PrivateRoute exact path="/parking" component={Parking} />
              <PrivateRoute exact path="/repark" component={Repark} />
              <PrivateRoute exact path="/Fail" component={Fail} />


            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
