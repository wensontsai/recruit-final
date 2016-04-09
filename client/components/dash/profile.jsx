import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { startExam, queryAllPrompts, finishExam } from '../../actions/dash';

import Timer from './countdownTimer';

import './dash.scss';

class Profile extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: {
        timeRemainingNow: ''
      }
    }
  }
  componentDidMount() {
      console.log('passed down props',this.props);  
  }

  render () {
    return (
      <div className='profile-view'>
        <div className='user-info'>
          <div>
            <span className='header'>First Name:</span> {this.props.dash.data.firstName}
          </div>
          <div>
            <span className='header'>Last Name:</span> {this.props.dash.data.lastName}
          </div>
          <div>
            <span className='header'>Email:</span> {this.props.dash.data.email}
          </div>
        </div>
        <div className='exam-status'>
        {(this.props.dash.view.examCompleted
          ? 
              <div className='status'>
                *** Thanks for taking the test! <br />
                We will reply to you shortly! ***
              </div>
          
          : this.props.dash.view.showPrompt
          ? <div className='status'>
              Time Remaining:
              <div className='countdown-timer'>
                <Timer initialTimeRemaining = {this.props.dash.data.timeRemaining}
                      handleTimeRemaining = {this.handleTimeRemaining}
                />
              </div>
              <div className='progress-area'>
                You are on question # {this.props.dash.data.questionsAsked} out of {this.props.dash.data.questionsTotal}
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
      </div>
    );
  }
  handleTimeRemaining (time) {
    console.log('made the round',time);
    // console.log(this.props.dash);
    // this.props.finishExam();
  }
  startExam () {
    this.props.startExam(this.props.dash);
    this.props.queryAllPrompts();
  }


}

export default connect(
  (state) => ({ dash: state.dash }),
  { startExam, queryAllPrompts, finishExam }
)(Profile);
