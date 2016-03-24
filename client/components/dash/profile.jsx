import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { startExam, setTimer } from '../../actions/dash';

import Timer from './countdownTimer';

import './dash.scss';

class Profile extends Component {
  constructor(props) {
      super(props);
      this.state = {
        dash: props.dash,
        startExam: props.startExam,
      };
  }  

  render (){
      // const {
      //     dash,
      //     startExam
      // } = this.props;

      return (
          <div className='profile-view'>
              <div>
                User information goes here:
              </div>
              {(this.props.dash.view.showPrompt
                ? <div className='status'>
                    Remaining Time: 
                    <div className='countdown-timer'>
                      <Timer initialTimeRemaining = {7200000}
                      />
                    </div>  
                  </div>
                : <div className='status'>
                    When you are ready to begin, click here  
                    <button className='btn btn-sm'
                      onClick={() => this.startExam ()}
                      >Start!
                    </button>
                  </div>
              )}        
          </div>
      );
  }

  startExam (){
    this.props.startExam(this.props.dash);
  }


}

export default connect(
  (state) => ({ dash: state.dash }),
  { startExam }
)(Profile);
