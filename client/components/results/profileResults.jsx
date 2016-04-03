import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import './results.scss';

class ProfileResults extends Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div className='profile-view'>
        <div className='user-info'>
          <div>
            First Name: {this.props.results.currentResult.firstName}
          </div>
          <div>
            Last Name: {this.props.results.currentResult.lastName}
          </div>
          <div>
            Email: {this.props.results.currentResult.email}
          </div>
          <div className='action-status'>{this.props.results.currentResult.actionStatus}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ results: state.results }),
  {}
)(ProfileResults);
