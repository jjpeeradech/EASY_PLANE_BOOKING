import React from 'react';
class App extends React.Component{
    constructor(props) {
      super(props)
      this.state = {...this.props.location.state,
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
          <h4 className="mb-3">Guest deatails {i+1}</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text"  style={{textTransform:'uppercase'}} className="form-control" id="firstName" placeholder="" required=""/>
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" style={{textTransform:'uppercase'}} className="form-control" id="lastName" placeholder=""  required=""/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>
            <div className='row'>
              <div className="col-md-4 mb-3">
                  <span className="form-label">Date of birth</span>
                  <input className="form-control" id='depart'type="date" required/>
              </div>
              <div className="d-block my-3" required>
                <div className="custom-control custom-radio">
                  <input id={"Male"+i} name={"sex"+i} type="radio" className="custom-control-input" required=""/>
                  <label className="custom-control-label" htmlFor={"Male"+i}>Male</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id={"Female"+i} name={"sex"+i} type="radio" className="custom-control-input" required=""/>
                  <label className="custom-control-label" htmlFor={"Female"+i}>Female</label>
                </div>
              </div>
            </div>
          </div>)
      
      

        tmp.push(arr)
      }
      console.log(tmp)
      return tmp
    }
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    render(){
        return(
          <div className="container">
          <div className="py-5 text-center">
            <h2>Checkout form</h2>
            <p className="lead">Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
          </div>
    
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your Ticket</span>
                 <span className="badge badge-secondary badge-pill">{this.state.isOneway?2:1}</span>
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
                  this.state.isOneway?
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
                  <strong>{!this.state.isOneway?this.formatNumber(this.state.priceDepart*this.state.Guest):this.formatNumber((this.state.priceDepart+this.state.priceReturn)*this.state.Guest)}</strong>
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
            <form className="needs-validation" noValidate="">
              {this.handleGuestDetails()}
               
                
    
               
                <hr className="mb-4"/>
                
                {/* <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="same-address"/>
                  <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="save-info"/>
                  <label className="custom-control-label" htmlFor="save-info">Save this information for next time</label>
                </div> */}
                <h4 className="mb-3">Contact details</h4>
                <div className="mb-3">
                  <label htmlFor="email">Email </label>
                  <input type="email" className="form-control" id="email" placeholder="you@example.com" required=""/>
                  <div className="invalid-feedback">
                    Your email is required.
                  </div>
                </div>
    
                <div className="mb-3">
                  <label htmlFor="address">Address</label>
                  <input type="text" className="form-control" id="address" placeholder="1234 Main St" required=""/>
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>
    
                <div className="mb-3">
                  <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
                  <input type="text" className="form-control" id="address2" placeholder="Apartment or suite"/>
                </div>
    
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zip">Zip</label>
                    <input type="text" className="form-control" id="zip" placeholder="" required=""/>
                    <div className="invalid-feedback">
                      Zip code required.
                    </div>
                  </div>
                </div>
                <hr className="mb-4"/>

                <h4 className="mb-3">Payment</h4>
    
                <div className="d-block my-3">
                  <div className="custom-control custom-radio">
                    <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" required=""/>
                    <label className="custom-control-label" htmlFor="credit">Credit card</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required=""/>
                    <label className="custom-control-label" htmlFor="debit">Debit card</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-name">Name on card</label>
                    <input type="text" className="form-control" id="cc-name" placeholder="" required=""/>
                    <small className="text-muted">Full name as displayed on card</small>
                    <div className="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-number">Credit card number</label>
                    <input type="text" className="form-control" id="cc-number" placeholder="" required=""/>
                    <div className="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration">Expiration</label>
                    <input type="text" className="form-control" id="cc-expiration" placeholder="" required=""/>
                    <div className="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration">CVV</label>
                    <input type="text" className="form-control" id="cc-cvv" placeholder="" required=""/>
                    <div className="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>
                <hr className="mb-4"/>
                <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
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