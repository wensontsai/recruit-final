import React, { Component, PropTypes } from 'react';
// import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { queryAllPromptsList, editPrompt, deletePrompt } from '../../actions/prompts';

import './prompts.scss';

class promptsList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      prompts: props.prompts,
      deletePrompt: props.deletePrompt,
      queryAllPromptsList: props.queryAlPromptsList,
    };
  }

  componentDidMount () {
    this.props.queryAllPromptsList();
  }

  render () {
    return (
      <div className='prompts-list-view'>
        <div className='row header'>
          <div className='field ' >QUESTIONS:</div>
          <div className='field edit-prompt' >EDIT:</div>
          <div className='field delete-prompt' >DELETE:</div>
        </div>
        {this.props.prompts.prompts.promptsAll.map(function(record, i) {
          return (
            <div className='row' key={i}>
              <div className='field question' >"{record.question}"</div>
              <div className='field edit-prompt' >
                <button className='btn btn-sm'
                  onClick={() => this.editPrompt (record._id)}
                >
                  Edit
                </button>
              </div>
              <div className='field delete-prompt'>
                <button className='btn btn-sm'
                  onClick={() => this.deletePrompt (record._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        }, this )}
      </div>
    );
  }
  editPrompt (promptId) {
    let data = {
      promptId: promptId
    }
    this.props.editPrompt (data);
  }
  deletePrompt (promptId) {
    let data = {
      promptId: promptId
    }
    this.props.deletePrompt (data);
  }

}

export default connect(
  (state) => ({ prompts: state.prompts }),
  { queryAllPromptsList, editPrompt, deletePrompt }
)(promptsList);
