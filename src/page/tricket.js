import React from 'react';
import {Redirect} from 'react-router-dom';

class App extends React.Component{
    constructor(props) {
        super(props)
        this.state = {...this.props.location.state,
        }
      
    }

    render(){


        return(   
            <div className="" style={{width:'650px'}}>
              <div style={{borderRadius:'1rem',backgroundColor:'#ff4500', overflow:'hidden'}}>
                <div className="row" style={{margin:'0px',padding:'0.6rem 1.25rem', color:'#f9ebd2'}}>
                  <div className="col-8" style={{}}>
                    <h2 style={{margin:'0px'}}>Boarding pass</h2>
                  </div>
                  <div className="col-4">
                    <div style={{display:'inline-block',float:'right'}}>
                      <div style={{display:'inline-block',marginRight:'2.5rem'}}>
                        <div style={{fontSize:'1rem'}}>Flight n°</div>
                        <div style={{fontSize:'1.3rem',lineHeight:'1.5rem'}}>VY1812</div>
                      </div>
                      <div style={{display:'inline-block',marginRight:'0.5rem'}}>
                        <div style={{fontSize:'1rem'}}>Gate</div>
                        <div style={{fontSize:'1.3rem',lineHeight:'1.5rem'}}>D26</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" style={{margin:'0px',padding:'0.6rem 1.25rem', backgroundColor:'#fff'}}>
                  <div className="col-8">
                    <div className="row" style={{marginTop:'0.0rem', marginBottom:'1.7rem'}}>
                      <div className="col-5" style={{textAlign:'center'}}>
                        <div style={{color:'#989898',fontSize:'1rem'}}>Munich</div>
                        <div style={{color:'#ff4500',fontSize:'2.5rem',lineHeight:'1.5rem'}}>MUC</div>
                      </div>
                      <div className="col-2" style={{textAlign:'center',paddingTop:'1.2rem', fontSize:'1rem'}}>
                        to
                      </div>
                      <div className="col-5" style={{textAlign:'center'}}>
                        <div style={{color:'#989898',fontSize:'1rem'}}>Barcelona</div>
                        <div style={{color:'#ff4500',fontSize:'2.5rem',lineHeight:'1.5rem'}}>BCN</div>
                      </div>
                    </div>
                    <div className="row" style={{marginBottom:'1.2rem'}}>
                      <div className="col-12">
                        <div style={{display:'inline-block', marginRight:'2rem'}}>
                          <div style={{color:'#989898',fontSize:'0.9rem'}}>Passenger</div>
                          <div style={{fontSize:'1.2rem',lineHeight:'1.5rem'}}>Victor Janin</div>
                        </div>
                        <div style={{display:'inline-block'}}>
                          <div style={{color:'#989898',fontSize:'0.9rem'}}>Seat</div>
                          <div style={{fontSize:'1.2rem',lineHeight:'1.5rem'}}>23A</div>
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{marginBottom:'1.2rem'}}>
                      <div className="col-12">
                        <div style={{display:'inline-block', marginRight:'2rem'}}>
                          <div style={{color:'#989898',fontSize:'0.9rem'}}>Boarding</div>
                          <div style={{fontSize:'1.2rem',lineHeight:'1.5rem'}}>18:20</div>
                        </div>
                        <div style={{display:'inline-block', marginRight:'2rem'}}>
                          <div style={{color:'#989898',fontSize:'0.9rem'}}>Departure</div>
                          <div style={{fontSize:'1.2rem',lineHeight:'1.5rem'}}>19:00</div>
                        </div>
                        <div style={{display:'inline-block'}}>
                          <div style={{color:'#989898',fontSize:'0.9rem'}}>Date</div>
                          <div style={{fontSize:'1.2rem',lineHeight:'1.5rem'}}>15/10/2017</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-4" style={{paddingTop:'1.5rem',textAlign:'right'}}>
                    <img src="img/qrcode.jpg" style={{width:'95%'}}/>
                  </div>
                </div>
              </div>
            </div>

        );
    }
}

export default App;