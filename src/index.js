import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import ChooseFlight from './page/chooseFlight'
import Information from './page/Information'
import ChooseSeat from './page/chooseSeat'
import Tricket from './page/tricket'
import Result from './page/result'
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
  <Switch>
      <Route path = '/' exact render = {props => <App {...props} /> } />
      <Route path = '/Flight' exact render = {props => <ChooseFlight {...props} /> } />
      <Route path = '/Information' exact render = {props => <Information {...props} /> } />
      <Route path = '/Seat' exact render = {props => <ChooseSeat {...props} /> } />
      <Route path = '/result/:id' exact render = {props => <Result {...props} /> } />
  </Switch>
</BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
