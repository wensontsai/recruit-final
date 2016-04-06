import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/sessions';

import './auth.scss';

import Nav from '../nav/nav';

class Logout extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: {
        loggedInUserId: ''
      }
    }
  }
  componentWillMount () {
    console.log(this.props);
    this.logoutUser ();
  }
  render () {
    const {
      sessions
    } = this.props;

    return (
      <div className='login-container'>
        <Nav />
      </div>
      )
  }
  logoutUser () {
    this.setState({
      data: {
        loggedInUserId: this.props.sessions.loggedInUserId
      }
    });
    this.props.logoutUser(this.state.data);
    browserHistory.push('/login');
  }

}

export default connect(
  (state) => ({ sessions: state.sessions }),
  { logoutUser }
)(Logout);
