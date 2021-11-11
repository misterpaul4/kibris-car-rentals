import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './container/App';
import './css/index.css';

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
