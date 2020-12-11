import React, { Component } from 'react'
import LineChart from "./charts/LineChart"
import "./dashboard.css"

class Dashboard extends Component {
    render() {
        return (
            <div id="dashboard"> 
                 <div id="item">
                    <div id="item1">1</div>
                    <div id="item2">2</div>
                </div>
                <div id="item3"><LineChart/></div>
            </div>
        )
    }
}

export default Dashboard