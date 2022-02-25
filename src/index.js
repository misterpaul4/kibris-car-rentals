import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import Routes from './routes/routes';
import './css/index.css';

const usernameLS = localStorage.getItem('username');
const tokenLS = localStorage.getItem('token');

const store = createStore(
  rootReducer,
  {
    auth: {
      loggedIn: tokenLS ? true : false,
      token: tokenLS,
      username: usernameLS
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
