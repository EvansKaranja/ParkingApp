 import React, { Component } from 'react'
 import { Line } from 'react-chartjs-2';
 import { connect } from "react-redux";

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData:{
                labels:['Monday','Tuesday','wednesday','Thur','Friday','Saturday','Sunday'],

                datasets:[
                    {
                        label:'Revenue',
                        data:[10, 8, 2, 0, 0, 0, 0],
                        backgroundColor:[
                            // 'rgba(255,99,132,0.6)',
                            'rgba(54,162,235,0.6)',
                            // 'rgba(255,206,86,0.6)',
                            // 'rgba(75,192,192,0.6)',
                            // 'rgba(153,102,255,0.6)',
                            // 'rgba(255,159,64,0.6)',
                            // 'rgba(255,120,235,0.6)',
                            // 'rgba(255,206,132,0.6)',
                            // 'rgba(255,162,86,0.6)',
                             ]
                    
                    }
                ],
         
            },
            options:{
                maintainAspectRatio:true,
                responsive:true,
                title:{
                    display:true,
                    text:' Total Revenue',
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
                padding:20,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        // fontSize: 18,
                        // stepSize: 1,
                    },
                    gridLines: {
                        display: true ,
                        color: "#b3b3b3"
                      },
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        // fontSize: 14,
                        // stepSize: 1,
                    },
                    gridLines: {
                        display: true ,
                        color: "#b3b3b3"
                      },
                }],
                
            }
               
            }
        };
        
      }
      componentDidMount(){
        // this.setState({...this.state,chartData:this.props.totalAmountPerWeek}) 
        console.log(this.props.totalAmountPerWeek)

        
        
        }
        componentDidUpdate(){
           
        }
     render() {
         return (
             <div>
             {this.props.totalAmountPerWeek?
             <div>
               <Line
            data={this.state.chartData}
//   width={100}
         height={100}
            options={this.state.options}
            />
             </div>:<span></span>}</div>
         )
     }
 }
 const mapStateToProps = (state) => ({
    vehicleTypeCount:state.admin.vehicleTypeCount,
    totalAmountPerWeek:state.admin.totalAmountPerWeek,

  });
 export default connect(mapStateToProps,{})(LineChart )