import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import './results.scss';

class AnswerResults extends Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div className='answers-view'>
        <div className='ques-ans-block header'>
          <div className='field prompt' >PROMPT:</div>
          <div className='field answer' >ANSWER:</div>
        </div>
        {this.props.results.currentResult.allAnswers.map(function(record) {
          return (
            <div className='ques-ans-block' key={record._id}>
              <div className='field prompt' >"{record.prompt}"</div>
              <div className='field answer' >{record.answer}</div>
            </div>
          )
        }, this )}
      </div>
    );
  }
}

export default connect(
  (state) => ({ results: state.results }),
  {}
)(AnswerResults);
