import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Nav from '../nav/nav';
import Notifications from '../notifications/notifications';
import AddCandidate from './addCandidate';
import CandidatesList from './candidatesList';

import './candidates.scss';

class Candidates extends Component {
  render () {
    const {
      candidates,
      notifications
    } = this.props;

    return (
        <div className='display-all-container'>
            <Nav />
            <Notifications />
            {(/(^|;)\s*token=/.test(document.cookie)
              ? <div className='page'>
                  <AddCandidate />
                  <CandidatesList />
                </div>
              :  this.redirectToLogin()
            )}   
        </div>
    );
  }
  redirectToLogin () {
    browserHistory.push('/login');
  }
}

export default connect(
  (state) => ({ candidates: state.candidates, notifications: state.notifications }),
  {}
)(Candidates);