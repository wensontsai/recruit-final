import { combineReducers } from 'redux';
import dash from './dash';
import candidates from './candidates';
import results from './results';

const reducers = combineReducers({
  dash,
  candidates,
  results
});

export default reducers;
