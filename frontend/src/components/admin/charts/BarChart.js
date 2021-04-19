import React, { Component } from 'react'
import { HorizontalBar } from 'react-chartjs-2';

class LineChart extends Component {
   constructor(props) {
       super(props);
       this.state = {
           chartData:{
               labels:['Monday','Tuesday','wednesday','Thur','Friday','Saturday','Sunday'],
               datasets:[
                   {
                    label:'Total Vehicles Reserved',
                    data:[15,12,10,0,0,0,0,],
                    backgroundColor:[
                        'rgba(255,99,132,0.6)',
                        'rgba(54,162,235,0.6)',
                        'rgba(255,206,86,0.6)',
                        'rgba(75,192,192,0.6)',
                        'rgba(153,102,255,0.6)',
                        'rgba(255,159,64,0.6)',
                        'rgba(255,120,235,0.6)',
                        ]
                   
                   },
               ]
            
           },
           options:{
            title:{
                display:true,
                text:'Vehicles Reserved',
                fontSize:16,
                fontColor:'white'
            }
            ,legend:{
                display:false,
                position:'right',
                labels:{
                    fontColor:'white'
                }
            },
            layout:{
                padding:'10px',
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        // fontSize: 18,
                        // stepSize: 1,
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        // fontSize: 14,
                        // stepSize: 1,
                    }
                }]
            }
         
        }
       };
       
     }
    render() {
        return (
            <div>
              <HorizontalBar
 data={this.state.chartData}
//   width={100}
//   height={50}
 options={this.state.options}
/>
            </div>
        )
    }
}
export default LineChart 