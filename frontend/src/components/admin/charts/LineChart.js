 import React, { Component } from 'react'
 var Line = require("react-chartjs").Line;

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData:{
                labels:['Boston','Worcester','Springfield','Lowel','Cambridge','New Benford'],
                datasets:[
                    {
                        label:'Population',
                        data:[617594,181045,153060,106519,105162,95072],
                        backgroungColor:[
                            'rgba(255,99,132,0.6)',
                            'rgba(54,162,235,0.6)',
                            'rgba(255,206,86,0.6)',
                            'rgba(75,192,192,0.6)',
                            'rgba(153,102,255,0.6)',
                            'rgba(255,159,64,0.6)',
                            'rgba(255,99,132,0.6)']
                    
                    }
                ]
            }
        };
        
      }
     render() {
         return (
             <div>
                <Line data={this.state.chartData} options={{}} width="600" height="250"/>
             </div>
         )
     }
 }
 export default LineChart 