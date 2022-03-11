import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../component/Cars/App';
import LogIn from '../component/Authentication/LogIn';
import Signup from '../component/Authentication/Signup';
import Car from '../component/Car/Car';
import Favourite from '../component/Favourite/Favourite';
import Alert from '../component/Alert';
import LoginModal from '../component/Authentication/LoginModal';
import PrivateRoute from './PrivateRoute';
import '../css/index.css';

const Routes = ({
  showAlert: alart,
}) => {

  return (
  <BrowserRouter>
  {
    alart.reveal ?
    <Alert />
    : null
  }
    <LoginModal /> 
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/cars/:id/:rental/:manufacturer/:model" component={Car} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoute exact path="/users/:username/cars/favourite" component={Favourite} />
    </Switch>
  </BrowserRouter>
)};

const mapStateToProps = state => ({
  showAlert: state.alart,
});

export default connect(mapStateToProps, null)(Routes);
