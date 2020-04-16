import React from 'react';
class App extends React.Component{
    constructor(props) {
      super(props)
      let guest = 0
      if(this.props.location.state){
        guest = this.props.location.state.Guest
      }
      let firstName = []
      let lastName = []
      let birth = []
      let sex = []
      for(let i=0;i<parseInt(guest);i++){
        firstName.push('')
        lastName.push('')
        birth.push('')
        sex.push('')
      }
      this.state = {...this.props.location.state,
          firstName:firstName,
          lastName:lastName,
          birth:birth,
          sex:sex,
          Email:'',
          Address:'',
          Address2:'',
          Zip:'',
          Payment:''
        }
    }
    componentDidMount(){
        console.log(this.state)
    }

    handleGuestDetails(){
      let tmp= []
      for(let i =0;i<parseInt(this.props.location.state.Guest);i++){
        let arr = []
        arr.push(<div>
          <h4 className="mb-3">Guest details {i+1}</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text"  style={{textTransform:'uppercase'}} autoComplete='off' className="form-control" id={"firstName"+i} placeholder="" required value={this.state.firstName[i]} 
                onChange={(e)=>{
                  let tmp =this.state.firstName
                  tmp[i]=e.target.value.toUpperCase()
                  console.log(tmp)
                  this.setState({firstName:tmp})
                  }}/>
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" style={{textTransform:'uppercase'}} autoComplete='off' className="form-control" id={"lastName"+i} placeholder=""  required value={this.state.lastName[i]}
                onChange={(e)=>{
                  let tmp =this.state.lastName
                  tmp[i]=e.target.value.toUpperCase()
                  console.log(tmp)
                  this.setState({lastName:tmp})
                  }}/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>
            <div className='row'>
              <div className="col-md-4 mb-3">
                  <span className="form-label">Date of birth</span>
                  <input className="form-control" id={'depart'+i} type="date" required value={this.state.birth[i]} onChange={(e)=>{
                  let tmp =this.state.birth
                  tmp[i]=e.target.value.toUpperCase()
                  console.log(tmp)
                  this.setState({birth:tmp})
                  }}/>
              </div>
              <div className="d-block my-3" >
                <div className="custom-control custom-radio">
                  <input id={"Male"+i} name={"sex"+i} type="radio" className="custom-control-input" required value={this.state.sex[i]} onChange={(e)=>{
                  let tmp =this.state.sex
                  tmp[i]='male'
                  console.log(tmp)
                  this.setState({sex:tmp})
                  }}/>
                  <label className="custom-control-label" htmlFor={"Male"+i} >Male</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id={"Female"+i} name={"sex"+i} type="radio" className="custom-control-input" required value={this.state.sex[i]} onChange={(e)=>{
                  let tmp =this.state.sex
                  tmp[i]='female'
                  console.log(tmp)
                  this.setState({sex:tmp})
                  }}/>
                  <label className="custom-control-label" htmlFor={"Female"+i}>Female</label>
                </div>
              </div>
            </div>
          </div>)
      
      

        tmp.push(arr)
      }
      //console.log(tmp)
      return tmp
    }
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    handleCheckout(e){
      e.preventDefault();
      let tmpData = []
      let tmp =[]
      let tmpEmail = document.getElementById('email').value
      let tmpAddress = document.getElementById('address').value
      let tmpZip =document.getElementById('zip').value
      let ccName = document.getElementById('cc-name').value
      let ccNumber = document.getElementById('cc-number').value
      let ccExpiration = document.getElementById('cc-expiration').value
      let ccCvv = document.getElementById('cc-cvv').value
      for(let i = 0 ;i<this.state.Guest;i++){
        tmpData.push({firstname:this.state.firstName[i],
                  lastname:this.state.lastName[i],
                  sex:this.state.sex[i],
                  birth:this.state.birth[i]})
      }
      if(!this.state.isOneway){
        var tmpdate = this.state.Depart
        tmpdate = tmpdate.split('-')
        var date = tmpdate[2]+tmpdate[1]+tmpdate[0]
        var tmpdate2 = this.state.Return
        tmpdate2 = tmpdate2.split('-')
        var date2 = tmpdate2[2]+tmpdate2[1]+tmpdate2[0]
        tmp.push({personal_data:tmpData,
          Email:tmpEmail,
          Address:tmpAddress,
          Zip:tmpZip,
          payment:{type:this.state.Payment,name:ccName,number:ccNumber,expiration:ccExpiration,cvv:ccCvv},
          flight_depart:this.state.flight_select_depart,
          flight_return:this.state.flight_select_return,
          date_depart:date,
          date_return:date2,
          Class:this.state.Class
        })
      }
      else{
        var tmpdate3 = this.state.Depart
        tmpdate3 = tmpdate3.split('-')
        var date3 = tmpdate3[2]+tmpdate3[1]+tmpdate3[0]
        tmp.push({personal_data:tmpData,
          Email:tmpEmail,
          Address:tmpAddress,
          Zip:tmpZip,
          payment:{type:this.state.Payment,name:ccName,number:ccNumber,expiration:ccExpiration,cvv:ccCvv},
          flight_depart:this.state.flight_select_depart,
          date_depart:date3,
          Class:this.state.Class
        })
      }
      fetch('/booking',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(tmp[0])
      })
      console.log(tmp)
    }
    render(){
        return(
          <div className="container">
          <div className="py-5 text-center">
            <h2>Booking form</h2>
            <p className="lead">Please fill your information correctly to mack a booking for you</p>
          </div>
    
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your Ticket</span>
                 <span className="badge badge-secondary badge-pill">{this.state.isOneway?1:2}</span>
              </h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">{this.state.flight_select_depart+' '+this.state.From.split(",")[1]+' to '+this.state.To.split(',')[1]+' x '+this.state.Guest}</h6>
                    <small className="text-muted">{this.state.Depart+' '+this.state.take_off_depart+'-'+this.state.landing_depart}</small>
                  </div>
                    <span className="text-muted">{this.formatNumber((this.state.priceDepart*this.state.Guest))+"฿"}</span>
                </li>
                {
                  !this.state.isOneway?
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">{this.state.flight_select_return+' '+this.state.To.split(",")[1]+' to '+this.state.From.split(',')[1]+' x '+this.state.Guest}</h6>
                    <small className="text-muted">{this.state.Return+' '+this.state.take_off_return+'-'+this.state.landing_return}</small>
                  </div>
                  <span className="text-muted">{this.formatNumber((this.state.priceReturn*this.state.Guest))+"฿"}</span>
                </li>
                :null
                }
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (Bath)</span>
                  <strong>{this.state.isOneway?this.formatNumber(this.state.priceDepart*this.state.Guest)+"฿":this.formatNumber((this.state.priceDepart+this.state.priceReturn)*this.state.Guest)+"฿"}</strong>
                </li>
              </ul>
    
              {/* <form className="card p-2">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Promo code"/>
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-secondary">Redeem</button>
                  </div>
                </div>
              </form> */}
            </div>
            <div className="col-md-8 order-md-1">
            <form  onSubmit={(e)=>this.handleCheckout(e)}>
              {this.handleGuestDetails()}
               
                
    
               
                <hr className="mb-4"/>
                <h4 className="mb-3">Contact details</h4>
                <div className="mb-3">
                  <label htmlFor="email">Email </label>
                  <input type="email" className="form-control" autoComplete='off'  id="email" placeholder="you@example.com" required/>
                  <div className="invalid-feedback">
                    Your email is required.
                  </div>
                </div>
    
                <div className="mb-3">
                  <label htmlFor="address">Address</label>
                  <input type="text" className="form-control" autoComplete='off'  id="address" placeholder="1234 Main St" required/>
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>
    
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zip">Zip</label>
                    <input type="text" className="form-control" autoComplete='off'  id="zip" placeholder="" required/>
                    <div className="invalid-feedback">
                      Zip code required.
                    </div>
                  </div>
                </div>
                <hr className="mb-4"/>

                <h4 className="mb-3">Payment</h4>
    
                <div className="d-block my-3">
                  <div className="custom-control custom-radio">
                    <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" required checked={this.state.Payment==='creditcard'} onChange={()=>this.setState({Payment:'creditcard'})}/>
                    <label className="custom-control-label" htmlFor="credit">Credit card</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required checked={this.state.Payment==='debitcard'} onChange={()=>this.setState({Payment:'debitcard'})}/>
                    <label className="custom-control-label" htmlFor="debit">Debit card</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-name">Name on card</label>
                    <input type="text" className="form-control" autoComplete='off'  id="cc-name" placeholder="" required/>
                    <small className="text-muted">Full name as displayed on card</small>
                    <div className="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-number">Card number</label>
                    <input type="text" className="form-control" autoComplete='off'  id="cc-number" placeholder="" required/>
                    <div className="invalid-feedback">
                      Card number is required
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration">Expiration</label>
                    <input type="text" className="form-control" autoComplete='off'  id="cc-expiration" placeholder="" required/>
                    <div className="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration">CVV</label>
                    <input type="text" className="form-control" autoComplete='off'  id="cc-cvv" placeholder="" required/>
                    <div className="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>
                <hr className="mb-4"/>
                <button className="btn btn-primary btn-lg btn-block submit-btn">Continue to checkout</button>
              </form>
            </div>
          </div>
    
          <footer className="my-5 pt-5 text-muted text-center text-small">
            <p className="mb-1">© 2017-2018 Company Name</p>
          </footer>
        </div>
        )
    }
}
      
    

export default App;