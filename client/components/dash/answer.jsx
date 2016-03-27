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
      queryAllPrompts: props.queryAllPrompts,
      data: {
        userId: this.props.dash.data.userId || '',
        examId: this.props.dash.data.examId || '',
        promptId: this.props.dash.data.currentPromptId || '',
        answer: this.props.answer || '',
        questionsAsked: this.props.dash.data.questionsAsked || '',
        questionsTotal: this.props.dash.data.questionsTotal || ''   
      }
    };
  }

  render () {
    return (
      <div className='answer-view'>
        <div>
          Answer area
        </div>
        <textarea
          type='text'
          value={this.state.data.answer}
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
    this.setState({
      data: {
        userId: this.props.dash.data.userId,
        examId: this.props.dash.data.examId,
        promptId: this.props.dash.data.currentPromptId,
        answer: event.target.value,
        questionsAsked: this.props.dash.data.questionsAsked,
        questionsTotal: this.props.dash.data.questionsTotal
      }
    });
  }
  submitAnswer () {
    this.props.submitAnswer(this.state.data);
 
    this.setState({ 
      data:{
        userId: this.props.dash.data.userId,
        examId: this.props.dash.data.examId,
        promptId: this.props.dash.data.currentPromptId,
        answer: '',
        questionsAsked: this.props.dash.data.questionsAsked,
        questionsTotal: this.props.dash.data.questionsTotal
      } 
    });
  }

}

export default connect(
  (state) => ({ dash: state.dash }),
  { submitAnswer}
)(Answer);
