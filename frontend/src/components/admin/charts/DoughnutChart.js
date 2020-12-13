import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { connect } from "react-redux";

class DoughnutChart extends Component {
   constructor(props) {
       super(props);
       this.state = {
           chartData:{
               labels:null,
               datasets:[
                   {
                       label:'Vehicles',
                       data:null,
                       backgroundColor:[
                           'rgba(255,99,132,0.6)',
                           'rgba(54,162,235,0.6)',
                           'rgba(255,206,86,0.6)',
                           'rgba(75,192,192,0.6)',
                           'rgba(153,102,255,0.6)',
                           'rgba(255,159,64,0.6)',
                           'rgba(255,120,235,0.6)',
                           'rgba(255,206,132,0.6)',
                           'rgba(255,162,86,0.6)',
                           ]
                   
                   }
               ]
           },
           options:{
            title:{
                display:true,
                text:'Types of Vehicles',
                fontSize:16,
                fontColor:'white'
            }
            ,legend:{
                display:true,
                position:'right',
                labels:{
                    fontColor:'white'
                }
            },
            // layout:{
            //     padding:'10px',
            // }
        }
       };
       
     }
     componentDidMount(){
this.setState({...this.state,chartData:this.props.vehicleTypeCount}) 


}
     
//    componentDidUpdate( ){
       
//    }
    render() {
        return (
            <div>
              <Doughnut
 data={this.state.chartData}
//   width={100}
  height={140}
 options={this.state.options}
/>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    vehicleTypeCount:state.admin.vehicleTypeCount,
  });
  
export default connect(mapStateToProps, {})(DoughnutChart);
