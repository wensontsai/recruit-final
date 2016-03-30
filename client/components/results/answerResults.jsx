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
        <div className='row header'>
          <div className='field' >PROMPT</div>
          <div className='field' >ANSWER</div>
        </div>
        {this.props.results.currentResult.allAnswers.map(function(record) {
          return (
            <div className='row' key={record._id}>
              <div className='field' >{record.promptId}</div>
              <div className='field' >{record.answer}</div>  
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
