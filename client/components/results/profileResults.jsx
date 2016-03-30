import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import './results.scss';

class ProfileResults extends Component {
  constructor (props) {
    super (props);
    this.state = {
      results: props.results
    };
  }

  render () {
    return (
      <div className='profile-view'>
        <div className='user-info'>
          <div>
            Exam ID:{this.props.results.currentResult.examId}
          </div>
          <div>
            First Name: {this.props.results.currentResult.userId}
          </div>
          <div>
            Last Name: {this.props.results.currentResult.lastName}
          </div>
          <div>
            Email: {this.props.results.currentResult.email}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ results: state.results }),
  {}
)(ProfileResults);