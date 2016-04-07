'use strict';
import 'babel-polyfill';

import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory, Router, Route } from 'react-router';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import reducers from './reducers';

// import CSS
import './entry.scss';

// Components
import Main from './pages/main';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Dash from './components/dash/dash';
import Candidates from './components/candidates/candidates';
import Prompts from './components/prompts/prompts';
import Results from './components/results/results';

// Middleware
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  promise,
  createLogger(),
)(createStore);

const store = createStoreWithMiddleware(reducers);


ReactDOM.render(
  <Provider store={store} >
    <Router history={browserHistory} >
      <Route path='/' component={Login} />
      <Route path='/exams/:examId' component={Dash} />
      <Route path='/login' component={Login} />
      <Route path='/logout' component={Logout} />
      <Route path='/dash' component={Dash} />
      <Route path='/candidates' component={Candidates} />
      <Route path='/prompts' component={Prompts} />
      <Route path='/results/:userId' component={Results} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
