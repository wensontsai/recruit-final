import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { submitAnswer } from '../../actions/dash';


import './dash.scss';

class Answer extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: {
        userId: this.props.dash.data.userId || '',
        examId: this.props.dash.data.examId || '',
        promptId: this.props.dash.data.currentPromptId || '',
        answer: this.props.answer || '',
        questionsAsked: this.props.dash.data.questionsAsked || '',
        questionsTotal: this.props.dash.data.questionsTotal || '',
        endTime: this.props.dash.data.endTime,
        allPrompts: this.props.dash.data.allPrompts || []
      }
    };
  }

  render () {
    return (
      <div className='answer-view'>
        <div>
          Write your answer here:
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
        questionsTotal: this.props.dash.data.questionsTotal,
        endTime: this.props.dash.data.endTime,
        allPrompts: this.props.dash.data.allPrompts
      }
    });
  }
  submitAnswer () {
    if(this.state.data.answer !== ''){
      this.props.submitAnswer(this.state.data);
      this.setState({ 
        data:{
          userId: this.props.dash.data.userId,
          examId: this.props.dash.data.examId,
          promptId: this.props.dash.data.currentPromptId,
          answer: '',
          questionsAsked: this.props.dash.data.questionsAsked +1,
          questionsTotal: this.props.dash.data.questionsTotal,
          endTime: this.props.dash.data.endTime,
          allPrompts: this.props.dash.data.allPrompts
        } 
      });
    } else {
      
    }
 
  }

}

export default connect(
  (state) => ({ dash: state.dash }),
  { submitAnswer}
)(Answer);
