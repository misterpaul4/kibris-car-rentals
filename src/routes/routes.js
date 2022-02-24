import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../pages/App';
import LogIn from '../pages/LogIn';
import Signup from '../pages/Signup';
import Car from '../pages/Car';
import Favourite from '../pages/Favourite';
import Alert from '../component/Alert';
import PrivateRoute from './PrivateRoute';
import '../css/index.css';

const Routes = ({
  showAlert: alart,
}) => (
  <BrowserRouter>
  {
    alart.reveal ?
    <Alert />
    : null
  }
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/cars/:id/:rental/:manufacturer/:model" component={Car} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoute exact path="/user/:id/cars/favourites" component={Favourite} />
    </Switch>
  </BrowserRouter>
);

const mapStateToProps = state => ({
  showAlert: state.alart
});


export default connect(mapStateToProps, null)(Routes);
