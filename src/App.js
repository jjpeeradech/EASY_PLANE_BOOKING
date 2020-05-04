import React from 'react';
import {Redirect} from 'react-router-dom';
import './App.css';


class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      isOneway:false,
      IsrecieveFlight:false,
      showdropdownTo:false,
      showdropdownFrom:false,
      valueTo:'',
      valueFrom:'',
      placeFrom:[],
      placeTo:[],
      flight:[],
      IsRedirect:false,

      From:'',
      To:'',
      Depart:'',
      Return:'',
      Guest:0,
      Class:''
    }
  }
  

getFlight(){
  if(!this.state.IsrecieveFlight){
    fetch('/listFlight',{
      method:'GET'
    })
    .then((res) => res.json())
    .then( data => {
      let tmpFrom = []
      let tmpTo = []
      for(let flight of data){
        if(!tmpFrom.includes(flight[1])){
          tmpFrom.push(flight[1])
        }
        if(!tmpTo.includes(flight[2])){
          tmpTo.push(flight[2])
        }
      }
      this.setState({placeTo:tmpTo,placeFrom:tmpFrom,IsrecieveFlight:true,flight:data})
    })
}
}
handleFrom(place){
  if(this.state.valueTo!==''){
    const tmpPlace = this.state.valueTo
    let tmp = []
    for(let i of this.state.flight){
      if(i[2]===tmpPlace && !tmp.includes(i[1])){
        tmp.push(i[1])
      }
    }
    place = tmp
  }
  let arr = []
  for(let x of place){
    if(x===this.state.valueTo){
      continue
    }
    arr.push(<a href='#12' key={x} onMouseDown={()=>this.setState({valueFrom:x})}>{x}</a>)
  }
  return arr
}
handleTo(place){
  if(this.state.valueFrom!==''){
    const tmpPlace = this.state.valueFrom
    let tmp = []
    for(let i of this.state.flight){
      if(i[1]===tmpPlace && !tmp.includes(i[2])){
        tmp.push(i[2])
      }
    }
    place = tmp
  }
  let arr = []
  for(let x of place){
    if(x===this.state.valueFrom){
      continue
    }
    arr.push(<a href='#1' key={x} onMouseDown={()=>this.setState({valueTo:x})}>{x}</a>)
  }
  return arr
}
placefilter(x){
  var input = document.getElementById(x);
  var filter = input.value.toUpperCase();
  var div = document.getElementById("dropdown");
  if(div!=null){
    var a = div.getElementsByTagName("a");
    for (var i = 0; i < a.length; i++) {
      var txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

}
summitflight(){
  console.log(this.state)
  var getFrom = document.getElementById("From").value;
  var getTo = document.getElementById('To').value;
  var getDepart = document.getElementById('depart').value;
  var getGuest = document.getElementById('guest').value;
  var getClass = document.getElementById('class').value;
  if(!this.state.isOneway){
    var getReturn = document.getElementById('return').value;
    this.setState({
      From:getFrom,
      To:getTo,
      Depart:getDepart,
      Return:getReturn,
      Guest:getGuest,
      Class:getClass,
      IsRedirect:true
    })
  }
  else{
    this.setState({
      From:getFrom,
      To:getTo,
      Depart:getDepart,
      Guest:getGuest,
      Class:getClass,
      IsRedirect:true
    })
  }
}
render() {
  if(this.state.IsRedirect){  
    const {From, To, Depart,Return,Guest,Class,isOneway} = this.state
    return <Redirect to={{
      pathname: '/Flight',
      state: {From, To, Depart,Return,Guest,Class,isOneway}
  }}
/>
  }
  return (
    <div id="booking" className="section" >
    {this.getFlight()}
		<div className="section-center">
			<div className="container">
				<div className="row">
					<div className="col-lg-4">
						<div className="booking-cta">
							<h1>Lnw J1998 Airlines</h1>
              <p>by easy plane booking</p>
						</div>
					</div>
					<div className="col-lg-7 col-lg-offset-1">
						<div className="booking-form">
              <form onSubmit={()=>this.summitflight()}>
								<div className="form-group">
									<div className="form-checkbox">
										<label htmlFor="roundtrip">
											<input type="radio" id="roundtrip" name="flight-type" checked={!this.state.isOneway} onChange={()=>this.setState({isOneway:false})}/>
											<span></span>Roundtrip
										</label>
										<label htmlFor="one-way">
											<input type="radio" id="one-way" name="flight-type" onChange={()=>this.setState({isOneway:true})}/>
											<span></span>One way
										</label>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="form-group" onBlur={()=>this.setState({showdropdownFrom:false})}>
											<span className="form-label">Flying from</span>
                      <input id='From'className="form-control" type="text" placeholder="City or airport"  value={this.state.valueFrom} autoComplete="off"
                      onClick={()=>this.setState({showdropdownFrom:true})} 
                      onKeyUp={()=>this.placefilter('From')}
                      onChange={(e)=>this.setState({valueFrom:e.target.value})} required/>
                      {
                        this.state.showdropdownFrom?
                      <div className='dropdown-content' id='dropdown'>
                        {this.handleFrom(this.state.placeFrom)}
                      </div>
                      :null
                        }
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group" onBlur={()=>this.setState({showdropdownTo:false})}>
											<span className="form-label">Flyning to</span>
                      <input id='To' className="form-control"  type="text" placeholder="City or airport" value={this.state.valueTo}  autoComplete="off"
                      onClick={()=>this.setState({showdropdownTo:true})} 
                      onKeyUp={()=>this.placefilter('To')}
                      onChange={(e)=>this.setState({valueTo:e.target.value})} required/>
                      {
                        this.state.showdropdownTo?
                      <div className='dropdown-content' id='dropdown'>
                        {this.handleTo(this.state.placeTo)}
                      </div>
                      :null
                        }
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											<span className="form-label">Departing</span>
											<input className="form-control" id='depart'type="date" required/>
                      
										</div>
									</div>
                  {
                    !this.state.isOneway?
									<div className="col-md-6">
										<div className="form-group">
											<span className="form-label">Returning</span>
											<input className="form-control" id='return'type="date" required/>
										</div>
									</div>
                  :null
                  }
								</div>
								<div className="row">
									<div className="col-md-4">
										<div className="form-group">
											<span className="form-label">Guest</span>
											<select size='1' id='guest' className="form-control">
												<option>1</option>
												<option>2</option>
												<option>3</option>
                        <option>4</option>
                        <option>5</option>
											</select>
											<span className="select-arrow"></span>
										</div>
									</div>
									<div className="col-md-4">
										<div className="form-group">
											<span className="form-label">Travel className</span>
											<select size='1' id='class' className="form-control">
												<option value='Eco_left'>Economy class</option>
												<option value='Bs_left'>Business class</option>
												<option value='F_left'>First class</option>
											</select>
											<span className="select-arrow"></span>
										</div>
									</div>
								</div>
								<div className="form-btn">
									<button className="submit-btn">Show flights</button>
								</div>
                </form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

  );
}
}

export default App;
