import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { submitAnswer } from '../../actions/dash';

import './dash.scss';

class Answer extends Component {
  constructor (props) {
    super (props);
    this.state = {
      dash: props.dash,
      submitAnswer: props.submitAnswer,
      answer: this.props.answer || ''
    };
  }

  render () {
    return (
      <div className='answer-view'>
        <div>
          Answer area
        </div>
        <textarea
          type="text"
          value={this.state.answer}
          onChange={ this.handleChange.bind(this) }
        />
        <div className='submit-answer'>
          <button className='btn btn-sm start-exam'
            onClick={() => this.submitAnswer(this.props.answer)}
            >Submit Answer
          </button>
        </div>
      </div>
    );
  }
  handleChange (event) {
    this.setState({ answer: event.target.value });
  }
  submitAnswer () {
    console.log(this.state.answer);
    this.props.submitAnswer(this.state.answer);
  }

}

export default connect(
  (state) => ({ dash: state.dash }),
  { submitAnswer }
)(Answer);
