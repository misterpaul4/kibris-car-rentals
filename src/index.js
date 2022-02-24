import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import Routes from './routes/routes';
import './css/index.css';

const store = createStore(
  rootReducer,
  {
    auth: {
      loggedIn: false,
      token: '',
      username: '',
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
