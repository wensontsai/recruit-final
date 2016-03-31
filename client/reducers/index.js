import { combineReducers } from 'redux';
import dash from './dash';
import candidates from './candidates';
import results from './results';
import prompts from './prompts';

const reducers = combineReducers({
  dash,
  candidates,
  results,
  prompts
});

export default reducers;
