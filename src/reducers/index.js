import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alart: alertReducer,
});

export default rootReducer;
