import React, { Component, PropTypes } from 'react';
// import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import merge from 'lodash.merge';

import { queryAllPromptsList, toggleEditMode, saveEditPrompt, deletePrompt } from '../../actions/prompts';

import './prompts.scss';

class promptsList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: {
        editObj: {}
      }
    }
  }
  componentDidMount () {
    this.queryAllPromptsList();
  }
  render () {
    return (
      <div className='prompts-list-view'>
        <div className='row header'>
          <div className='react-wrapper'>
            <div className='field' >QUESTIONS</div>
            <div className='field edit-prompt' >EDIT</div>
            <div className='field delete-prompt' >DELETE</div>
          </div>
        </div>
        {this.props.prompts.prompts.promptsAll.map(function(record) {
          return (
            <div className='row' key={record._id}>
            {(this.props.prompts.prompts.editObj[record._id].mode
              ? <div className='react-wrapper'>
                  <div className='field question'>
                    <input
                      type='text'
                      defaultValue={this.props.prompts.prompts.editObj[record._id].data}
                      value={this.state.data.editObj[record._id]}
                      onChange={ this.handleEditPrompt.bind(this, record._id) }
                    />
                  </div>
                  <div className='field edit-prompt' >
                    <button className='btn btn-sm'
                      onClick={() => this.saveEditPrompt(record._id)}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              : <div className='react-wrapper'>
                  <div className='field question' >"{record.question}"</div>
                  <div className='field edit-prompt' >
                    <button className='btn btn-sm'
                      onClick={() => this.toggleEditMode (record._id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
            )}           
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
  queryAllPromptsList () {
    this.props.queryAllPromptsList();
  }
  handleEditPrompt (id, event) {
    const state = this.state.data;
    const newState = merge({}, state, {
      data: {
        editObj: {
          [id]: event.target.value
        }
      }
    });
    this.setState({
      data: newState.data
    });
  }
  toggleEditMode (id) {
    const data = {
      id: id
    }
    this.props.toggleEditMode(data);
  }
  saveEditPrompt (id) {
    const data = {
      id: id,
      question: this.state.data.editObj[id]
    };
    this.props.saveEditPrompt(data);
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
  { queryAllPromptsList, toggleEditMode, saveEditPrompt, deletePrompt }
)(promptsList);
