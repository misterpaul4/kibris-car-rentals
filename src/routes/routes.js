import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../pages/App';
import LogIn from '../pages/LogIn';
import Signup from '../pages/Signup';
import Car from '../pages/Car';
import Favourite from '../pages/Favourite';
import '../css/index.css';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/cars/:id/:rental/:manufacturer/:model" component={Car} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/user/:id/cars/favourites" component={Favourite} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
