import React from 'react';
import {Redirect} from 'react-router-dom';
class App extends React.Component{
    constructor(props) {
      super(props)
      this.state = {...this.props.location.state,
        listFlight:[],
        listFlight_Return:[],
        flight_select_depart:'',
        flight_select_return:'',
        return:false,
        redirect:false
        
    }
      
    }
    componentDidMount(){
        if(this.props.location.state){
            this.getFlight()
            this.getFlightReturn()
        }
    }
    getFlight(){
        var d =  new Date(this.state.Depart)
        var n = d.getDay()
        var tmpdate = this.state.Depart
        tmpdate = tmpdate.split('-')
        var date = tmpdate[2]+tmpdate[1]+tmpdate[0]
        fetch('/checkFlight?date='+date+'&from='+this.state.From+'&to='+this.state.To+'&class='+this.state.Class+'&day='+n+'&guest='+this.state.Guest,{
            method:'GET'
          })
          .then((res) => res.json())
         .then( data => {
            this.setState({listFlight:data})
         })
    }
    getFlightReturn(){
        var d =  new Date(this.state.Return)
        var n = d.getDay()
        var tmpdate = this.state.Return
        tmpdate = tmpdate.split('-')
        var date = tmpdate[2]+tmpdate[1]+tmpdate[0]
        fetch('/checkFlight?date='+date+'&from='+this.state.To+'&to='+this.state.From+'&class='+this.state.Class+'&day='+n+'&guest='+this.state.Guest,{
            method:'GET'
          })
          .then((res) => res.json())
         .then( data => {
            this.setState({listFlight_Return:data})
         })
    }
    handlerenderFlight_depart(data){
        let li = []
        for(let flight of data){
                let children =[]
                let num = flight.id
                children.push(<span className="quantity" key={num}>{flight.id}</span>)
                children.push(<span className="itemName" key={flight.take_off}>{flight.take_off+'------------------>'+flight.landing}</span>)
                children.push(<span className="price"  key={flight.price}>{flight.price+' ฿'}</span>)
                if(num===this.state.flight_select_depart){
                    li.push(<li key={num} className="row rows"  style={{backgroundColor:'#4ea6bc'}} onClick={()=>this.setState({flight_select_depart:flight.id})}>{children}</li>)
                }
                else{
                    li.push(<li key={num} className="row rows"  onClick={()=>{this.setState({flight_select_depart:num})}}>{children}</li>)
                }
                
          }
          return li
    }
    handlerenderFlight_return(data){
        let li = []
        for(let flight of data){
                let children =[]
                let num = flight.id
                children.push(<span className="quantity" key={num}>{flight.id}</span>)
                children.push(<span className="itemName" key={flight.take_off}>{flight.take_off+'------------------>'+flight.landing}</span>)
                children.push(<span className="price"  key={flight.price}>{flight.price+' ฿'}</span>)
                if(num===this.state.flight_select_return){
                    li.push(<li key={num} className="row rows"  style={{backgroundColor:'#4ea6bc'}} onClick={()=>this.setState({flight_select_return:flight.id})}>{children}</li>)
                }
                else{
                    li.push(<li key={num} className="row rows"  onClick={()=>{this.setState({flight_select_return:num})}}>{children}</li>)
                }
                
          }
          return li
    }
    handleDepart(){
        console.log(this.state.flight_select_depart)
        if(this.state.flight_select_depart!==''){
            if(this.state.IsOneway){
                this.setState({redirect:true})
            }
            else{
                this.setState({return:true})
            }
        }
        else{
            alert('Please choose your flight!')
        }
        
    }
    handleReturn(){
        console.log(this.state.flight_select_return)
        if(this.state.flight_select_return!==''){
            this.setState({redirect:true})
        }
        else{
            alert('Please choos your flight!')
        }
    }
    render(){
        if(this.props.location.state===undefined){
            return <Redirect to='/' />
        }
        else if (this.state.redirect && this.state.IsOneway){
            const {Depart,Guest,Class,IsOneway,flight_select_depart} = this.state
            return <Redirect to={{
                pathname: '/Information',
                state: {Depart,Guest,Class,IsOneway,flight_select_depart}
            }}
          />
        }
        else if (this.state.redirect && !this.state.IsOneway) {
            const {Depart,Return,Guest,Class,IsOneway,flight_select_depart,flight_select_return} = this.state
            return <Redirect to={{
                pathname: '/Information',
                state: {Depart,Return,Guest,Class,IsOneway,flight_select_depart,flight_select_return}
            }}
          />
        }
        return(
            <div>
                {!this.state.return?
                    <div className="container text-center">
                    <div className="col-md-5 col-sm-12">
                        <div className="bigcart"></div>
                        {
                            !this.state.IsOneway?
                            <div>
                                <h1>Depart</h1>
                                </div>
                                :null
                        }
                        <h1>{this.state.From.split(',')[1] +"-------->"+this.state.To.split(",")[1]}</h1>
                        <p>
                            Choose your Flight to fly with puttisit1997 airlines
                        </p>
                    </div>
                    
                    <div className="col-md-7 col-sm-12 text-left">
                        <ul>
                            <li className="row list-inline columnCaptions">
                                <span>Flight</span>
                                <span>Time</span>
                                <span>Price</span>
                            </li>
                            {this.handlerenderFlight_depart(this.state.listFlight)}
                            <li className="rows totals">
                                <span className="order"> <span className="text-center" onClick={()=>this.handleDepart()}>Book Now</span></span>
                            </li>
                        </ul>
                    </div>
                </div>
                :null
                    }
                {
                    this.state.return?
                    <div className="container text-center">
                    <div className="col-md-5 col-sm-12">
                        <div className="bigcart"></div>
                        {
                            !this.state.IsOneway?
                            <div>
                                <h1>Return</h1>
                                </div>
                                :null
                        }
                        <h1>{this.state.To.split(',')[1] +"-------->"+this.state.From.split(",")[1]}</h1>
                        <p>
                            Choose your Flight to fly with puttisit1997 airlines
                        </p>
                    </div>
                    
                    <div className="col-md-7 col-sm-12 text-left">
                        <ul>
                            <li className="row list-inline columnCaptions">
                                <span>Flight</span>
                                <span>Time</span>
                                <span>Price</span>
                            </li>
                            {this.handlerenderFlight_return(this.state.listFlight_Return)}
                            <li className="rows totals">
                                <span className="order"> <span className="text-center" onClick={()=>this.handleReturn()}>Book Now</span></span>
                            </li>
                        </ul>
                    </div>
                </div>
                    :null
                }
            </div>
        );
    }
}

export default App;