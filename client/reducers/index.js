import { combineReducers } from 'redux';
import dash from './dash';
import candidates from './candidates';
import results from './results';
import prompts from './prompts';
import sessions from './sessions';
import notifications from './notifications';

const reducers = combineReducers({
  dash,
  candidates,
  results,
  prompts,
  sessions,
  notifications
});

export default reducers;
