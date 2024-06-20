import { combineReducers } from 'redux';
import { authReducer } from '../reducers/Auth.reducers';

export const RootReducer = combineReducers({
  auth: authReducer,
});
