import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { startExam } from '../../actions/dash';

import './dash.scss';

class Profile extends Component {
    render (){
        const {
            dash,
            startExam
        } = this.props;

        return (
            <div className='profile-view'>
                <div>
                  User information goes here:
                </div>
                {'\n'}
                <div>
                  when you are ready to begin, click here:
                </div>
                  <button className='btn btn-sm'
                    onClick={() => startExam(dash)}
                    >Start!
                  </button>
                <div className='countdown-timer'>
                  01:00:83 remaining
                </div>
            </div>
        );
    }
}

export default connect(
  (state) => ({ dash: state.dash }),
  { startExam }
)(Profile);
