import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './pages/App';
import LogIn from './pages/LogIn';
import Signup from './pages/Signup';
import Car from './pages/Car';
import './css/index.css';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/cars/:id" component={Car} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
