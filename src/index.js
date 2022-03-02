import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import Routes from './routes/routes';
import './css/index.css';

const usernameLS = localStorage.getItem('username');
const tokenLS = localStorage.getItem('token');

const storeConfig = tokenLS ? {
  loggedIn: true,
  token: tokenLS,
  username: usernameLS
} : 
{
  loggedIn: false,
  token: '',
  username: ''
}

const store = createStore(
  rootReducer,
  {
    auth: {
      loggedIn: storeConfig.loggedIn,
      token: storeConfig.token ,
      username: storeConfig.username
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
