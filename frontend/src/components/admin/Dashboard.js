import React, { Component } from 'react'
import LineChart from "./charts/LineChart"
import BarChart from './charts/BarChart'
import DoughnutChart from './charts/DoughnutChart'
import {dashboardData} from "../../actions/admin"
import { connect } from "react-redux";


import "./dashboard.css"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    
    }
    componentDidMount(){
        this.props.dashboardData()
    }
    render() {
        
      if (this.props.vehicleTypeCount){
        return (
            <div id="dashboard"> 
                 <div id="item">
                    <div id="Doughtnut"><DoughnutChart/></div>
                    <div id="Bar"><BarChart/></div>
                </div>
                <div id="Line"><LineChart/></div>
                <div style={{height:"20px", width:"100%"}}></div>
            </div>
        )
      }else return (
          <span></span>
      )
    }
}

const mapStateToProps = (state) => ({
    vehicleTypeCount:state.admin.vehicleTypeCount,
    totalAmountPerWeek:state.admin.totalAmountPerWeek,
  });
  
export default connect(mapStateToProps, {dashboardData})(Dashboard);
