import React, { Component, PropTypes } from 'react';
// import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import merge from 'lodash.merge';

import { queryAllPromptsList, editPrompt, saveEditPrompt, deletePrompt } from '../../actions/prompts';

import './prompts.scss';

class promptsList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      prompts: props.prompts,
      editPrompt: props.editPrompt,
      saveEditPrompt: props.saveEditPrompt,
      deletePrompt: props.deletePrompt,
      queryAllPromptsList: props.queryAlPromptsList,
    };
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
                      value={this.props.prompts.prompts.editObj[record._id].data}
                      onChange={ this.handleEditPrompt.bind(this, record._id ) }
                    />
                  </div>
                  <div className='field edit-prompt' >
                    <button className='btn btn-sm'
                      onClick={() => this.saveEditPrompt (record._id)}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              : <div className='react-wrapper'>
                  <div className='field question' >"{record.question}"</div>
                  <div className='field edit-prompt' >
                    <button className='btn btn-sm'
                      onClick={() => this.editPrompt (record._id)}
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
  handleEditPrompt (id) {
    this.setState({
      data: {
        editPrompt: {
          [id]: event.target.value,
        }
      }
    });
  }
  editPrompt (promptId) {
    const data = {
      id: promptId
    };
    this.props.editPrompt(data);
  }
  saveEditPrompt (promptId) {
    const data = {
      id: promptId
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
  { queryAllPromptsList, editPrompt, saveEditPrompt, deletePrompt }
)(promptsList);
