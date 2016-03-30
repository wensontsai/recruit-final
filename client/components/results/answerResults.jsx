import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import './results.scss';


class AnswerResults extends Component {
  constructor (props) {
    super (props);
    this.state = {
      results: props.results
    };
  }

  render () {
    return (
      <div className='answers-view'>
        <div className='ques-ans-block'>
          <div className='field prompt' >PROMPT</div>
          <div className='field answer' >ANSWER</div>
        </div>
        
      </div>
    );
  }
}

export default connect(
  (state) => ({ results: state.results }),
  {}
)(AnswerResults);
