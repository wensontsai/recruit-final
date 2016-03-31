import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { addPrompt } from '../../actions/prompts';

import './prompts.scss';

class AddPromptView extends Component {
  constructor (props) {
    super (props);
    // this.hideStatusView = this.hideStatusView.bind(this);
    this.state = {
      prompts: props.prompts,
      addPrompt: props.addPrompt,
      data: {
        question: this.props.question || ''
      },
      showStatus: this.props.showStatus || 'true'
    };
  }

  render () {
    return (
      <div className='prompt-add-view'>
        <div className='column'>
          <div>
            <div>Question:</div>
            <textarea
              type='text'
              value={this.state.data.question}
              onChange={ this.handleChangeQuestion.bind(this) }
            />
          </div>
        </div>
        <div className='column-submit'>
          <div className='add-prompt'>
            <button className='btn btn-sm add-prompt'
              onClick={() => this.addPrompt(this.hideStatusView.bind(this))}
              >Add Prompt
            </button>
          </div>
          {(this.state.showStatus
            ? <div className='action-status'>
                <ReactCSSTransitionGroup transitionName='example' transitionEnterTimeout={500} transitionLeaveTimeout={300} >
                    {this.props.prompts.actionStatus}
                </ReactCSSTransitionGroup>
              </div>
            : ''
          )}
        </div>
      </div>
    );
  }
  handleChangeQuestion (event) {
    this.setState({ 
      data: {
        question: event.target.value,
      }
    });
    console.log(this.state.data.question);
  }

  addPrompt (hideFunc) {
    console.log(this.state.data);
    this.props.addPrompt(this.state.data);
    this.setState({ data:{} });

    setTimeout(function() { hideFunc() }, 5000);
  }
  hideStatusView () {
    this.setState({
      showStatus: false
    });
    console.log(this);
  }

}

export default connect(
  (state) => ({ prompts: state.prompts }),
  { addPrompt }
)(AddPromptView);
