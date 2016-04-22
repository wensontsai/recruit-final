import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Nav from '../nav/nav';
import Notifications from '../notifications/notifications';
import AddPrompt from './addPrompt';
import PromptsList from './promptsList';

import { queryAllPromptsList } from '../../actions/prompts';

class Prompts extends Component {
  componentDidMount () {
    this.props.queryAllPromptsList();
  }

  render (){
    const {
      prompts,
      notifications
    } = this.props;

    return (
        <div className='display-all-container'>
            <Nav />
            <Notifications />
            {(/(^|;)\s*token=/.test(document.cookie)
              ? <div className='page'>
                  <AddPrompt />
                  <PromptsList />
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
  (state) => ({ prompts: state.prompts, notifications: state.notifications }),
  { queryAllPromptsList }
)(Prompts);