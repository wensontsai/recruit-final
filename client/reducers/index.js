import { combineReducers } from 'redux';
import dash from './dash';
import candidates from './candidates';
import results from './results';
import prompts from './prompts';
import sessions from './sessions';

const reducers = combineReducers({
  dash,
  candidates,
  results,
  prompts,
  sessions
});

export default reducers;
