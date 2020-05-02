import React from 'react';
import {Redirect} from 'react-router-dom';
const rows = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const colums = ['A', 'B', 'C', 'D', 'E', 'F']
class App extends React.Component{
    constructor(props) {
        super(props)
        this.state = {...this.props.location.state,
            notavailable_depart : [],
            notavailable_return : [],
            seat_depart:[],
            seat_return:[],
            is_return_round:false
        }
      
    }
    componentDidMount(){
        console.log(this.state)
        if(this.state.isOneway){
            const {Class, date_depart, flight_depart } = this.state
            fetch(`/getBookedSeat?Class=${Class}&date_depart=${date_depart}&flight_depart=${flight_depart}`,{
                method:'GET'
            })
            .then((res) => res.json())
            .then( data => {
                console.log(data)
                this.setState({notavailable_depart:data.depart})
            })
        }else{
            const {Class, date_depart, flight_depart, date_return, flight_return} = this.state
            fetch(`/getBookedSeat?Class=${Class}&date_depart=${date_depart}&flight_depart=${flight_depart}&date_return=${date_return}&flight_return=${flight_return}`,{
                method:'GET'
            })
            .then((res) => res.json())
            .then( data => {
                console.log(data)
                this.setState({notavailable_depart:data.depart, notavailable_return:data.return})
            })
        }
        
    }
    chooseSeat(seatID){
        if(this.state.is_return_round){
            let seat = this.state.seat_return
            const limit = this.state.personal_data.length
            if(seat.includes(seatID)){
                seat = seat.filter(e => e !== seatID);
                this.setState({seat_return:seat})
            }else{
                if(seat.length < limit){
                    seat.push(seatID)
                    this.setState({seat_return:seat})
                }
            }
        }
        else{
            let seat = this.state.seat_depart
            const limit = this.state.personal_data.length
            if(seat.includes(seatID)){
                seat = seat.filter(e => e !== seatID);
                this.setState({seat_depart:seat})
            }else{
                if(seat.length < limit){
                    seat.push(seatID)
                    this.setState({seat_depart:seat})
                }
            }
        }
    }
    nextSelect(){
        console.log(this.state.isOneway)
        console.log(this.state.is_return_round)
        if(!this.state.isOneway){
            if(!this.state.is_return_round){
                if(this.state.personal_data.length - this.state.seat_depart.length == 0){
                    this.setState({is_return_round:true})
                }else{
                    alert('กรุณาเลือกที่นั่งให้ครบ')
                }

            }
        }
    }
    backSelect(){
        if(!this.state.isOneway){
            if(this.state.is_return_round){
                this.setState({is_return_round:false})
            }
        }
    }
    confirm(){
        console.log('confirm')
        console.log('confirm')
        const {personal_data, seat_depart, seat_return, isOneway, Address, Class, Email, Zip, date_depart, date_return, flight_depart, flight_return, payment} = this.state
        if(personal_data.length - seat_depart.length == 0){
            if(!isOneway){
                if(personal_data.length - seat_return.length == 0){

                }else{
                    alert('กรุณาเลือกที่นั่งให้ครบ')
                }
                fetch('/booking',{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({personal_data, seat_depart, seat_return, isOneway, Address, Class, Email, Zip, date_depart, date_return, flight_depart, flight_return, payment})
                }).then(res => res.json())
                .then(data => {
                 
                    console.log(data)
                    if(data.id){
                        window.history.pushState(null, '')
                        window.location.href = '/result/'+data.id
                    }
                })
            }else{
                fetch('/booking',{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({personal_data, seat_depart, isOneway, Address, Class, Email, Zip, date_depart, flight_depart, payment})
                }).then(res => res.json())
                .then(data => {
                    
                    console.log(data)
                    if(data.id){
                        window.history.pushState(null, '')
                        window.location.href = '/result/'+data.id
                    }

                })
            }

        }else{
            alert('กรุณาเลือกที่นั่งให้ครบ')
        }

        
    }
    render(){
        if(this.props.location.state===undefined || this.state.back){
            return <Redirect to='/' />
        }

        const notavailable_depart = this.state.notavailable_depart
        const notavailable_return = this.state.notavailable_return
        const personal_data = this.state.personal_data
        const seat_depart = this.state.seat_depart
        const seat_return = this.state.seat_return
        

        return(   
            <div className="container chooseSeat">
                {/* <div className="py-5 text-center">
                    <h2><h1 style={{display:'inline-block',float:'left',cursor:'pointer'}}>&#x2190;</h1>Booking form</h2>
                    <p className="lead">Please fill your information correctly to mack a booking for you</p>
                </div> */}
            
                <div className="row">
                    
                    <div className="col-md-8 ">
                        <div className="plane">
                            <div className="cockpit">
                                <h1>Please select a seat</h1>
                            </div>
                            <div className="exit exit--front fuselage">
                                
                            </div>
                            <ol className="cabin fuselage">
                                {rows.map((row, row_key)=>(
                                    <li key={row_key} className="row">
                                        <ol className="seats" type={row}>
                                            {colums.map((colum, colum_key)=>
                                            !this.state.is_return_round?
                                                notavailable_depart.includes(row+colum)?
                                                (<li key={colum_key} className="seat">
                                                    <input type="checkbox" disabled id={row+colum} />
                                                    <label htmlFor={row+colum}>{row+colum}</label>
                                                </li>)
                                                :
                                                (<li key={colum_key} className="seat">
                                                    <input type="checkbox" id={row+colum} checked={
                                                        this.state.is_return_round?
                                                            seat_return.includes(row+colum) 
                                                            : 
                                                            seat_depart.includes(row+colum)
                                                    } onChange={(e)=>this.chooseSeat(row+colum)}/>
                                                    <label htmlFor={row+colum}>{row+colum}</label>
                                                </li>)
                                            :
                                                notavailable_return.includes(row+colum)?
                                                (<li key={colum_key} className="seat">
                                                    <input type="checkbox" disabled id={row+colum} />
                                                    <label htmlFor={row+colum}>{row+colum}</label>
                                                </li>)
                                                :
                                                (<li key={colum_key} className="seat">
                                                    <input type="checkbox" id={row+colum} checked={
                                                        this.state.is_return_round?
                                                            seat_return.includes(row+colum) 
                                                            : 
                                                            seat_depart.includes(row+colum)
                                                    } onChange={(e)=>this.chooseSeat(row+colum)}/>
                                                    <label htmlFor={row+colum}>{row+colum}</label>
                                                </li>)
                                            )}
                                        </ol>
                                    </li>
                                ))}
                            </ol>
                            <div className="exit exit--back fuselage">
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3" style={{marginTop:100}}>
                        {this.state.is_return_round?
                            <span className="text-muted">ที่นั่งขากลับ</span>:
                            <span className="text-muted">ที่นั่งขาไป</span>
                        }
                            {/* <span className="badge badge-secondary badge-pill">{this.state.isOneway?1:2}</span> */}
                        </h4>
                        <ul className="list-group mb-3">
                            {personal_data.map((data,key)=> (
                                <li className="list-group-item d-flex justify-content-between lh-condensed py-3">
                                    <div>
                                        <h6 className="my-0">{data.firstname+' '+data.lastname}</h6>
                                        <small className="text-muted"></small>
                                    </div>
                                    <span className="text-muted">{
                                        !this.state.is_return_round?
                                            seat_depart.length>key?seat_depart[key]:'ยังไม่ได้เลือก':
                                            seat_return.length>key?seat_return[key]:'ยังไม่ได้เลือก'
                                    }</span>
                                </li>)
                            )}
                            {/* <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">55</h6>
                                    <small className="text-muted"></small>
                                </div>
                                <span className="text-muted">44</span>
                            </li> */}
                            
                           
                        </ul>
                        
                        {this.state.isOneway||this.state.is_return_round?
                            <div>
                                <button type="button" onClick={(e)=>this.confirm()} class="btn btn-primary btn-lg btn-block">Confirm</button>
                                <button type="button" onClick={(e)=>this.backSelect()} class="btn btn-secondary btn-lg btn-block">Back</button>
                            </div>
                            :
                            <div>
                                <button type="button" onClick={(e)=>this.nextSelect()} class="btn btn-primary btn-lg btn-block">Next</button>
                                <button type="button" class="btn btn-secondary btn-lg btn-block">Back</button>
                            </div>
                        }
                        
                    </div>
                </div>

            </div>

        );
    }
}

export default App;