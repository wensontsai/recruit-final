import { combineReducers } from 'redux';
import dash from './dash';
import candidates from './candidates';

const reducers = combineReducers({
  dash,
  candidates
});

export default reducers;
