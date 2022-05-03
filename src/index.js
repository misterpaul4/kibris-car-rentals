import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import Routes from './routes/Routes';
import './css/index.css';

const usernameLS = localStorage.getItem('username');
const companyLS = localStorage.getItem('company');
const tokenLS = localStorage.getItem('token');

const storeConfig = tokenLS ? {
  loggedIn: true,
  token: tokenLS,
  username: usernameLS,
  company: companyLS
} : 
{
  loggedIn: false,
  token: '',
  username: '',
  company: ''
}

const store = createStore(
  rootReducer,
  {
    auth: {
      loggedIn: storeConfig.loggedIn,
      token: storeConfig.token ,
      username: storeConfig.username,
      company: storeConfig.company,
      revealModal: false,
    },
    alart: {
      reveal: false,
      message: '',
      positiveOutcome: null
    }
  },
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
