import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

class CountDownTimer extends Component {
  constructor (props) {
    super (props);
    this.state = {
      timeoutId: null,
      prevTime: null,
      initialTimeRemaining: React.PropTypes.number.isRequired,
      interval: props.interval || 1000,
      formatFunc: props.formatFunc || null,
      tickCallback: props.tickCallback || null,
      completeCallback: props.completeCallback || null,

      timeRemaining: props.initialTimeRemaining,
      handleTimeRemaining: props.handleTimeRemaining,
    }
  }
  componentDidMount () {
    this.tick();  
  }
  componentWillReceiveProps (nextProps) {
    if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
    this.setState({
      prevTime: null, 
      timeRemaining: nextProps.initialTimeRemaining
    });
  }
  componentDidUpdate () {
    if ((!this.state.prevTime) && this.state.timeRemaining > 0 ) {
      this.tick();
    }
  }
  componentWillUnmount () {
    clearTimeout(this.state.timeoutId);
  }
  tick () {
    var currentTime = Date.now();
    var dt = this.state.prevTime ? (currentTime - this.state.prevTime) : 0;
    var interval = this.state.interval;

    // correct for small variations in actual timeout time
    var timeRemainingInInterval = (interval - (dt % interval));
    var timeout = timeRemainingInInterval;

    if (timeRemainingInInterval < (interval / 2.0)) {
      timeout += interval;
    }

    var timeRemaining = Math.max(this.state.timeRemaining - dt, 0);
    var countdownComplete = (this.state.prevTime && timeRemaining <= 0);

    // if (this.isMounted()) {
      if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
      this.setState({
        timeoutId: countdownComplete ? null : setTimeout(this.tick, timeout),
        prevTime: currentTime,
        timeRemaining: timeRemaining
      });
    // }

    if (countdownComplete) {
      if (this.props.completeCallback) { this.props.completeCallback(); }
      return;
    }

    if (this.props.tickCallback) {
      this.props.tickCallback(timeRemaining);
    }
  }
  getFormattedTime (milliseconds) {
    if (this.props.formatFunc) {
      return this.props.formatFunc(milliseconds);
    }

    var totalSeconds = Math.round(milliseconds / 1000);

    var seconds = parseInt(totalSeconds % 60, 10);
    var minutes = parseInt(totalSeconds / 60, 10) % 60;
    var hours = parseInt(totalSeconds / 3600, 10);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    return hours + ':' + minutes + ':' + seconds;
  }

  render (){
    var timeRemaining = this.state.timeRemaining;

      return (
        <div 
          className='timer'
          onChange={this.handleTimeRemaining(timeRemaining)}
        >
          {this.getFormattedTime(timeRemaining)}
        </div>
      );
  }
  handleTimeRemaining (timeRemaining) {
    // WTF
    // this.props.parentTimeRemaining(timeRemaining);

    console.log(timeRemaining);
  }
}

export default connect(
  (state) => ({ dash: state.dash })
)(CountDownTimer);
