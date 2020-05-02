import React from 'react';
import {Redirect} from 'react-router-dom';
import Tricket from '../component/tricket';

class App extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          trickets_depart:[],
          trickets_return:[]
        }
      
    }
    componentDidMount(){
      console.log('tesr')
      const { id } = this.props.match.params
      fetch('/result?id='+id,{
        method:'GET',
      })
      .then(res => res.json())
      .then(data => {
        let temp = []
        for (let index = 0; index < data.personal_data.length; index++) {
          const tricketData = {
            flight_code: data.flight_depart.id, 
            seat: data.seat_depart[index], 
            start_full: data.flight_depart.start.split(',')[0], 
            start_short: data.flight_depart.start.split(',')[1], 
            end_full: data.flight_depart.end.split(',')[0], 
            end_short: data.flight_depart.end.split(',')[1], 
            take_off: data.flight_depart.take_off, 
            landing: data.flight_depart.landing, 
            passenger: data.personal_data[index].firstname+" "+data.personal_data[index].lastname, 
            date: [data.date_depart.slice(0, 2), '/', data.date_depart.slice(2, 4), '/', data.date_depart.slice(4)].join('')
            
          }
          temp.push(tricketData)
        }
        if(!data.isOneway){
          let temp2 = []
          for (let index = 0; index < data.personal_data.length; index++) {
            const tricketData = {
              flight_code: data.flight_return.id, 
              seat: data.seat_return[index], 
              start_full: data.flight_return.start.split(',')[0], 
              start_short: data.flight_return.start.split(',')[1], 
              end_full: data.flight_return.end.split(',')[0], 
              end_short: data.flight_return.end.split(',')[1], 
              take_off: data.flight_return.take_off, 
              landing: data.flight_return.landing, 
              passenger: data.personal_data[index].firstname+" "+data.personal_data[index].lastname, 
              date: [data.date_return.slice(0, 2), '/', data.date_return.slice(2, 4), '/', data.date_return.slice(4)].join('')
              
            }
            temp2.push(tricketData)
          }
          this.setState({trickets_depart:temp, trickets_return:temp2})
        }else{
          this.setState({trickets_depart:temp})
        }
        
      })
    }

    render(){
        const {trickets_depart, trickets_return} = this.state
        if(trickets_return.length==0){
          return(   
              <div className="bg-plane">
                {trickets_depart.map((data,key)=><Tricket key={key} {...data} />)}
                
              </div>

          );
        }else{
          return(  
            <div className="bg-plane">
              <div style={{maxWidth:1400, margin:'auto'}}>
                <div className="row">
                  <div className="col-xl-6">
                    <h2 style={{textAlign:'center',margin:'2.5rem',fontWeight: 'bold', color:'#333'}}>Depart</h2>
                    {trickets_depart.map((data,key)=><Tricket key={key} {...data} />)}
                  </div>
                  
                  <div className="col-xl-6">
                    <h2  style={{textAlign:'center',margin:'2.5rem',fontWeight: 'bold', color:'#333'}}>Return</h2>
                    {trickets_return.map((data,key)=><Tricket key={key} {...data} />)}
                  </div>
                </div>
              </div>
            </div> 
            

          );
        }
        
    }
}

export default App;