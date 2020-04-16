import React from 'react';
import {Redirect} from 'react-router-dom';
class App extends React.Component{
    constructor(props) {
      super(props)
      this.state = {...this.props.location.state,
        listFlight:[],
        listFlight_Return:[],
        priceDepart:0,
        priceReturn:0,
        flight_select_depart:'',
        flight_select_return:'',
        return:false,
        redirect:false,
        take_off_depart:'',
        take_off_return:'',
        landing_depart:'',
        landing_return:'',
        back:false
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
        let Div = []
        for(let flight of data){
                let children =[]
                let num = flight.id
                children.push(<div className="quantity col-3" style={{textAlign:'center'}} key={num}>{flight.id}</div>)
                children.push(<div className="itemName col-6" style={{textAlign:'center'}} key={flight.take_off}>{flight.take_off+'------->'+flight.landing}</div>)
                children.push(<div className="price col-3" style={{textAlign:'center'}} key={flight.price}>{flight.price+'฿'}</div>)
                if(num===this.state.flight_select_depart){
                    Div.push(<div key={num} className="row rows"  style={{backgroundColor:'#4ea6bc'}} onClick={()=>this.setState({flight_select_depart:flight.id,take_off_depart:flight.take_off,landing_depart:flight.landing,priceDepart:parseInt(flight.price)})}>{children}</div>)
                }
                else{
                    Div.push(<div key={num} className="row rows"  onClick={()=>{this.setState({flight_select_depart:num,take_off_depart:flight.take_off,landing_depart:flight.landing,priceDepart:parseInt(flight.price)})}}>{children}</div>)
                }
                
          }
          return Div
    }
    handlerenderFlight_return(data){
        let Div = []
        for(let flight of data){
                let children =[]
                let num = flight.id
                children.push(<div className="quantity col-3" style={{textAlign:'center'}} key={num}>{flight.id}</div>)
                children.push(<div className="itemName col-6" style={{textAlign:'center'}} key={flight.take_off}>{flight.take_off+'------->'+flight.landing}</div>)
                children.push(<div className="price col-3" style={{textAlign:'center'}}  key={flight.price}>{flight.price+'฿'}</div>)
                if(num===this.state.flight_select_return){
                    Div.push(<div key={num} className="row rows"  style={{backgroundColor:'#4ea6bc'}} onClick={()=>this.setState({flight_select_return:flight.id,take_off_return:flight.take_off,landing_return:flight.landing,priceReturn:parseInt(flight.price)})}>{children}</div>)
                }
                else{
                    Div.push(<div key={num} className="row rows"  onClick={()=>{this.setState({flight_select_return:num,take_off_return:flight.take_off,landing_return:flight.landing,priceReturn:parseInt(flight.price)})}}>{children}</div>)
                }
                
          }
          return Div
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
        if(this.props.location.state===undefined || this.state.back){
            return <Redirect to='/' />
        }
        else if (this.state.redirect && this.state.IsOneway){
            const {Depart,Guest,Class,IsOneway,flight_select_depart,take_off_depart,landing_depart,From,To,priceDepart} = this.state
            return <Redirect to={{
                pathname: '/Information',
                state: {Depart,Guest,Class,IsOneway,flight_select_depart,take_off_depart,landing_depart,From,To,priceDepart}
            }}
          />
        }
        else if (this.state.redirect && !this.state.IsOneway) {
            const {Depart,Return,Guest,Class,IsOneway,flight_select_depart,flight_select_return,take_off_depart,landing_depart,take_off_return,landing_return,From,To,priceDepart,priceReturn} = this.state
            return <Redirect to={{
                pathname: '/Information',
                state: {Depart,Return,Guest,Class,IsOneway,flight_select_depart,flight_select_return,take_off_depart,take_off_return,landing_depart,landing_return,From,To,priceDepart,priceReturn}
            }}
          />
        }
        return(
            <div >
                {!this.state.return?
                    <div className="container text-center">
                        <h1 style={{textAlign:'left',marginTop:30,cursor:'pointer'}} onClick={()=>this.setState({back:true})}>&#x2190;</h1>
                        <div className="bigcart"></div>
                        <div className='row'>
                    <div className="col-lg-5">
                        
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
                    
                    <div className="col-lg-7 text-left">
                        <div className="row list-inline columnCaptions">
                            <div className="col-3" style={{textAlign:'center'}}>Flight</div>
                            <div className="col-6" style={{textAlign:'center'}}>Time</div>
                            <div className="col-3" style={{textAlign:'center'}}>Price per Person</div>
                        </div>
                        {this.handlerenderFlight_depart(this.state.listFlight)}
                        <div className="totals">
                            <span className="order"> <span className="text-center" onClick={()=>this.handleDepart()}>Book Now</span></span>
                        </div>
                    </div>
                    </div>
                </div>
                :null
                    }
                {
                    this.state.return?
                    <div className="container text-center">
                        <h1 style={{textAlign:'left',marginTop:30,cursor:'pointer'}} onClick={()=>this.setState({back:true})}>&#x2190;</h1>
                        <div className="bigcart"></div>
                        <div className='row'>
                    <div className="col-lg-5 col-sm-12">
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
                    
                    <div className="col-lg-7 text-left">
                        <div className="row list-inline columnCaptions">
                            <div className="col-3" style={{textAlign:'center'}}>Flight</div>
                            <div className="col-6" style={{textAlign:'center'}}>Time</div>
                            <div className="col-3" style={{textAlign:'center'}}>Price per Person</div>
                        </div>
                        {this.handlerenderFlight_return(this.state.listFlight_Return)}
                        <div className="totals">
                            <span className="order"> <span className="text-center" onClick={()=>this.handleReturn()}>Book Now</span></span>
                        </div>
                    </div>
                    </div>
                </div>
                    :null
                }
                <nav className="navbar fixed-bottom navbar-light" style={{backgroundColor:'#4ea6bc'}}>
  <p className="navbar-brand">LNWJ1998 AIRLINE</p>
  <form className="form-inline">
            <h3 style={{color:'white'}}>Totals: {(this.state.priceDepart+this.state.priceReturn)*parseInt(this.state.Guest)} ฿</h3>
  </form>
</nav>
            </div>

        );
    }
}

export default App;