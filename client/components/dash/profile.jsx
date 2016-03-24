import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { startExam } from '../../actions/dash';

import Timer from './countdownTimer';

import './dash.scss';

class Profile extends Component {
  constructor (props) {
      super (props);
      this.state = {
        dash: props.dash,
        startExam: props.startExam,
      };
  }

  componentDidMount() {
    // on load - query Users table, set data on candidate (userId) using emailCode

    // if an exam has begun,
    // go get remaining time, and pass it to countdown timer
  }

  render () {
    return (
      <div className='profile-view'>
        <div>
          User information goes here:
        </div>
        {(this.props.dash.view.showPrompt
          ? <div className='status'>
              Time Remaining:
              <div className='countdown-timer'>
                <Timer initialTimeRemaining = {this.props.dash.data.timeAllowed}
                />
              </div>
            </div>
          : <div className='status'>
              You have 2 hours to complete the exam.<br />
              When you are ready to begin click below:<br />
              <button className='btn btn-sm start-exam'
                onClick={() => this.startExam ()}
                >Start Exam
              </button>
            </div>
        )}
      </div>
    );
  }

  startExam () {
    this.props.startExam(this.props.dash);
  }


}

export default connect(
  (state) => ({ dash: state.dash }),
  { startExam }
)(Profile);
